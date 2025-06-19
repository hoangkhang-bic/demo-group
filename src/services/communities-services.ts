import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import groupMockData from './mock-communities';

// Types
export interface GroupMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface SubGroup {
  id: string;
  name: string;
  type: string;
  icon: string;
  color: string;
  memberCount: number;
  parentId: string;
  isExpanded?: boolean;
  members?: GroupMember[];
  subGroups?: SubGroup[];
}

export interface Group {
  id: string;
  name: string;
  type: string;
  icon: string;
  color: string;
  memberCount: number;
  isExpanded: boolean;
  members?: GroupMember[];
  subGroups?: SubGroup[];
}

export interface GroupsData {
  groups: Group[];
}

// API URL
const API_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';

// Flag to control whether to use mock data or real API
const USE_MOCK_API = true;

/**
 * React Query hook for fetching communities data
 */
export const useCommunitiesData = (options = {}) => {
  return useQuery({
    queryKey: ['communities'],
    queryFn: async () => {
      if (USE_MOCK_API) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        // Return mock data
        return groupMockData;
      } else {
        // Real API call
        const token = localStorage.getItem('auth_token');
        const headers = new Headers({
          'Content-Type': 'application/json'
        });
        
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        
        const response = await fetch(`${API_URL}/communities`, { headers });
        
        if (!response.ok) {
          throw new Error(`Error fetching communities: ${response.status}`);
        }
        
        return response.json();
      }
    },
    ...options
  });
};

/**
 * React Query hook for fetching a specific community by ID
 */
export const useCommunityData = (communityId: string, options = {}) => {
  return useQuery({
    queryKey: ['community', communityId],
    queryFn: async () => {
      if (USE_MOCK_API) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // Find the community in mock data
        const community = groupMockData.groups.find(group => group.id === communityId);
        
        if (!community) {
          throw new Error(`Community not found: ${communityId}`);
        }
        
        return community;
      } else {
        // Real API call
        const token = localStorage.getItem('auth_token');
        const headers = new Headers({
          'Content-Type': 'application/json'
        });
        
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        
        const response = await fetch(`${API_URL}/communities/${communityId}`, { headers });
        
        if (!response.ok) {
          throw new Error(`Error fetching community: ${response.status}`);
        }
        
        return response.json();
      }
    },
    enabled: !!communityId,
    ...options
  });
};

/**
 * React Query hook for updating a community
 */
export const useUpdateCommunity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ communityId, data }: { communityId: string, data: Partial<Group> }): Promise<Group> => {
      if (USE_MOCK_API) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 700));
        
        // In a real implementation, this would update the data on the server
        // For now, we'll just return the data that was passed in
        return { 
          ...groupMockData.groups.find(group => group.id === communityId),
          ...data
        } as Group;
      } else {
        const token = localStorage.getItem('auth_token');
        const headers = new Headers({
          'Content-Type': 'application/json'
        });
        
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        
        const response = await fetch(`${API_URL}/communities/${communityId}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify(data)
        });
        
        if (!response.ok) {
          throw new Error(`Error updating community: ${response.status}`);
        }
        
        return response.json();
      }
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch the relevant queries
      queryClient.invalidateQueries({ queryKey: ['communities'] });
      queryClient.invalidateQueries({ queryKey: ['community', variables.communityId] });
    }
  });
};              