import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface User {
    id: string
    name: string
    email: string
    avatar?: string
    role: string
    perms: string[]
}

// Use environment variable or default to a development API URL
const API_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';

// Flag to control whether to use mock data or real API
const USE_MOCK_API = true;

/**
 * React Query hook for fetching user information
 */
export const useUserInfo = (options = {}) => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      if (USE_MOCK_API) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Return mock user data
        return {
          id: "1",
          name: "Rocket Raccoon",
          email: "john@example.com",
          avatar: "https://konachan.net/image/219bc0c7cd94fc7b388e7646e416e011/Konachan.com%20-%20389912%20barefoot%20black_hair%20blue_archive%20blush%20chinese_dress%20dress%20gray_eyes%20halo%20long_hair%20momobug22%20red%20ryuuge_kisaki%20signed%20twintails%20watermark.jpg",
          role: "admin",
          perms: ["admin", "user", "guest"],
        };
      } else {
        // Real API call
        const token = localStorage.getItem('auth_token');
        const headers = new Headers({
          'Content-Type': 'application/json'
        });
        
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        
        const response = await fetch(`${API_URL}/users/me`, { headers });
        
        if (!response.ok) {
          throw new Error(`Error fetching user: ${response.status}`);
        }
        
        return response.json();
      }
    },
    ...options
  });
};

/**
 * React Query hook for updating user information
 */
export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userData: Partial<User>): Promise<User> => {
      const token = localStorage.getItem('auth_token');
      const headers = new Headers({
        'Content-Type': 'application/json'
      });
      
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      
      const response = await fetch(`${API_URL}/users/me`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        throw new Error(`Error updating user: ${response.status}`);
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch the userInfo query when update is successful
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    }
  });
};