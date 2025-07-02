import React from 'react';
import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { allCommunities, getCommunitiesWithLength, getMockCommunityById, getUserCommunities } from '@services/mock-communities-index';

// Types
export interface GroupMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface Community {
  id: string;
  name: string;
  type?: string;
  icon?: string;
  color?: string;
  memberCount?: number;
  isExpanded?: boolean;
  avatarUrl?: string;
  isVerified?: boolean;
  isPinned?: boolean;
  level?: number;
  groups?: Group[];
  members?: GroupMember[];
}

export interface Group extends Community {
  parentId?: string;
  description?: string;
}

export type StoreUpdateCallback = {
  setCommunities?: (communities: Group[]) => void;
  setCurrentCommunity?: (community: Group) => void;
  setUserCommunities?: (communities: Group[]) => void;
};

// Constants
const API_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';
const USE_MOCK_API = true;

// Query Keys
export const communityKeys = {
  all: ['communities'] as const,
  lists: () => [...communityKeys.all, 'list'] as const,
  list: (filters: string) => [...communityKeys.lists(), { filters }] as const,
  details: () => [...communityKeys.all, 'detail'] as const,
  detail: (id: string) => [...communityKeys.details(), id] as const,
  withLength: (length: number) => [...communityKeys.all, 'withLength', length] as const,
  userCommunities: () => [...communityKeys.all, 'userCommunities'] as const,
};

// Helper Functions
const createAuthHeaders = (): Headers => {
  const headers = new Headers({
    'Content-Type': 'application/json'
  });
  
  const token = localStorage.getItem('auth_token');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  return headers;
};

const simulateApiDelay = (ms: number = 800): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const handleApiError = (response: Response, context: string): void => {
  if (!response.ok) {
    throw new Error(`${context}: ${response.status} ${response.statusText}`);
  }
};

// API Functions
const fetchCommunities = async (): Promise<Community[]> => {
  if (USE_MOCK_API) {
    await simulateApiDelay();
    return allCommunities;
  }
  
  const response = await fetch(`${API_URL}/communities`, { 
    headers: createAuthHeaders() 
  });
  handleApiError(response, 'Error fetching communities');
  
  return response.json();
};

const fetchCommunityById = async (communityId: string): Promise<Community> => {
  if (USE_MOCK_API) {
    await simulateApiDelay(500);
    const community = getMockCommunityById(communityId);
    
    if (!community) {
      throw new Error(`Community not found: ${communityId}`);
    }
    
    return community;
  }
  
  const response = await fetch(`${API_URL}/communities/${communityId}`, { 
    headers: createAuthHeaders() 
  });
  handleApiError(response, 'Error fetching community');
  
  return response.json();
};

const updateCommunityById = async ({ communityId, data }: { communityId: string; data: Partial<Group> }): Promise<Group> => {
  if (USE_MOCK_API) {
    await simulateApiDelay(700);
    const existingCommunity = allCommunities.find(group => group.id === communityId);
    
    if (!existingCommunity) {
      throw new Error(`Community not found: ${communityId}`);
    }
    
    return { ...existingCommunity, ...data };
  }
  
  const response = await fetch(`${API_URL}/communities/${communityId}`, {
    method: 'PATCH',
    headers: createAuthHeaders(),
    body: JSON.stringify(data)
  });
  handleApiError(response, 'Error updating community');
  
  return response.json();
};

const fetchCommunitiesWithLength = async (length: number): Promise<Group[]> => {
  if (USE_MOCK_API) {
    await simulateApiDelay();
    console.log("fetchCommunitiesWithLength", length);
    console.log("getCommunitiesWithLength =====>", getCommunitiesWithLength(length));
    return getCommunitiesWithLength(length);
  }
  
  const response = await fetch(`${API_URL}/communities?limit=${length}`, { 
    headers: createAuthHeaders() 
  });
  handleApiError(response, 'Error fetching communities with length');
  
  return response.json();
};

const fetchUserCommunities = async (length: number): Promise<Group[]> => {
  if (USE_MOCK_API) {
    await simulateApiDelay();
    return getUserCommunities(length);
  }
  
  const response = await fetch(`${API_URL}/user/communities?limit=${length}`, { 
    headers: createAuthHeaders() 
  });
  handleApiError(response, 'Error fetching user communities');
  
  return response.json();
};

// Base React Query Hooks (without store integration)
export const useCommunitiesData = (options: Omit<UseQueryOptions<Group[], Error>, 'queryKey' | 'queryFn'> = {}) => {
  return useQuery({
    queryKey: communityKeys.all,
    queryFn: fetchCommunities,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    ...options
  });
};

export const useCommunityData = (
  communityId: string, 
  options: Omit<UseQueryOptions<Group, Error>, 'queryKey' | 'queryFn' | 'enabled'> = {}
) => {
  return useQuery({
    queryKey: communityKeys.detail(communityId),
    queryFn: () => fetchCommunityById(communityId),
    enabled: !!communityId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options
  });
};

export const useGetCommunityById = (
  communityId: string, 
  options: Omit<UseQueryOptions<Community, Error>, 'queryKey' | 'queryFn' | 'enabled'> = {}
) => {
  return useQuery({
    queryKey: communityKeys.detail(communityId),
    queryFn: () => fetchCommunityById(communityId),
    enabled: !!communityId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options
  });
};

export const useCommunitiesWithLength = (
  length: number, 
  options: Omit<UseQueryOptions<Group[], Error>, 'queryKey' | 'queryFn'> = {}
) => {
  return useQuery({
    queryKey: communityKeys.withLength(length),
    queryFn: () => fetchCommunitiesWithLength(length),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options
  });
};

export const useUserCommunities = (
  length: number, 
  options: Omit<UseQueryOptions<Group[], Error>, 'queryKey' | 'queryFn'> = {}
) => {
  return useQuery({
    queryKey: communityKeys.userCommunities(),
    queryFn: () => fetchUserCommunities(length),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options
  });
};

export const useUpdateCommunity = (
  options: Omit<UseMutationOptions<Group, Error, { communityId: string; data: Partial<Group> }>, 'mutationFn'> = {}
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateCommunityById,
    onSuccess: (updatedCommunity, variables) => {
      // Update the specific community in cache
      queryClient.setQueryData(
        communityKeys.detail(variables.communityId), 
        updatedCommunity
      );
      
      // Update the community in the communities list cache
      queryClient.setQueryData(communityKeys.all, (oldData: Group[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.map(community => 
          community.id === variables.communityId ? updatedCommunity : community
        );
      });
      
      // Invalidate related queries if needed
      queryClient.invalidateQueries({ queryKey: communityKeys.userCommunities() });
    },
    ...options
  });
};

// Store-integrated hooks
export const useCommunitiesWithStore = (
  length: number,
  storeCallbacks: StoreUpdateCallback,
  options: Omit<UseQueryOptions<Group[], Error>, 'queryKey' | 'queryFn'> = {}
) => {
  const query = useQuery({
    queryKey: communityKeys.withLength(length),
    queryFn: () => fetchCommunitiesWithLength(length),
    staleTime: 5 * 60 * 1000,
    ...options,
  });

  // Memoize the callback to prevent unnecessary re-renders
  const setCommunities = 
    (data: Group[]) => {
      if (storeCallbacks.setCommunities) {
        storeCallbacks.setCommunities(data);
      }
    }
  
  // Sync with store when data changes
  React.useEffect(() => {
    if (query.data && !query.isLoading && !query.error) {
      setCommunities(query.data);
    }
  }, [query.data, query.isLoading, query.error]);

  return query;
};

export const useUserCommunitiesWithStore = (
  length: number,
  storeCallbacks: StoreUpdateCallback,
  options: Omit<UseQueryOptions<Group[], Error>, 'queryKey' | 'queryFn'> = {}
) => {
  const query = useQuery({
    queryKey: communityKeys.userCommunities(),
    queryFn: () => fetchUserCommunities(length),
    staleTime: 5 * 60 * 1000,
    ...options,
  });

  // Sync with store when data changes
  React.useEffect(() => {
    if (query.data && !query.isLoading && !query.error && storeCallbacks.setUserCommunities) {
      storeCallbacks.setUserCommunities(query.data);
    }
  }, [query.data, query.isLoading, query.error, storeCallbacks]);

  return query;
};

export const useCommunityWithStore = (
  communityId: string,
  storeCallbacks: StoreUpdateCallback,
  options: Omit<UseQueryOptions<Group, Error>, 'queryKey' | 'queryFn' | 'enabled'> = {}
) => {
  const query = useQuery({
    queryKey: communityKeys.detail(communityId),
    queryFn: () => fetchCommunityById(communityId),
    enabled: !!communityId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });

  // Sync with store when data changes
  React.useEffect(() => {
    if (query.data && !query.isLoading && !query.error && storeCallbacks.setCurrentCommunity) {
      storeCallbacks.setCurrentCommunity(query.data);
    }
  }, [query.data, query.isLoading, query.error, storeCallbacks]);

  return query;
};

export const useUpdateCommunityWithStore = (
  storeCallbacks: StoreUpdateCallback,
  options: Omit<UseMutationOptions<Group, Error, { communityId: string; data: Partial<Group> }>, 'mutationFn' | 'onSuccess'> = {}
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateCommunityById,
    onSuccess: (updatedCommunity, variables, context) => {
      // Update React Query cache
      queryClient.setQueryData(
        communityKeys.detail(variables.communityId), 
        updatedCommunity
      );
      
      queryClient.setQueryData(communityKeys.all, (oldData: Group[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.map(community => 
          community.id === variables.communityId ? updatedCommunity : community
        );
      });
      
      // Update store
      if (storeCallbacks.setCurrentCommunity) {
        storeCallbacks.setCurrentCommunity(updatedCommunity);
      }
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: communityKeys.userCommunities() });
    },
    ...options
  });
};

// Utility functions for cache management
export const invalidateCommunitiesCache = (queryClient: ReturnType<typeof useQueryClient>) => {
  queryClient.invalidateQueries({ queryKey: communityKeys.all });
};

export const prefetchCommunity = (queryClient: ReturnType<typeof useQueryClient>, communityId: string) => {
  return queryClient.prefetchQuery({
    queryKey: communityKeys.detail(communityId),
    queryFn: () => fetchCommunityById(communityId),
    staleTime: 5 * 60 * 1000,
  });
};
