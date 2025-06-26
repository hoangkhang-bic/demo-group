import { create } from 'zustand'
import { useEffect } from 'react'
import { 
  Group, 
  useCommunitiesWithStore, 
  useUserCommunitiesWithStore, 
  useCommunityWithStore,
  useUpdateCommunityWithStore,
  StoreUpdateCallback, 
  prefetchCommunity 
} from '@services/communities-services'
import { useQueryClient } from '@tanstack/react-query'

// Define the store interface
interface CommunitiesStore {
  // State
  communities: Group[]
  currentCommunity: Group | null
  userCommunities: Group[]
  
  // Actions
  setCommunities: (communities: Group[]) => void
  setCurrentCommunity: (community: Group | null) => void
  setUserCommunities: (communities: Group[]) => void
  clearCommunities: () => void
  clearCurrentCommunity: () => void
  clearUserCommunities: () => void
  
  // Optimistic update helpers
  updateCommunityInList: (communityId: string, updates: Partial<Group>) => void
  addCommunityToList: (community: Group) => void
  removeCommunityFromList: (communityId: string) => void
}

// Create the Zustand store
export const useCommunitiesStore = create<CommunitiesStore>((set, get) => ({
  // Initial state
  communities: [],
  currentCommunity: null,
  userCommunities: [],
  
  // Basic setters
  setCommunities: (communities: Group[]) => set({ communities }),
  setCurrentCommunity: (community: Group | null) => set({ currentCommunity: community }),
  setUserCommunities: (communities: Group[]) => set({ userCommunities: communities }),
  
  // Clear methods
  clearCommunities: () => set({ communities: [] }),
  clearCurrentCommunity: () => set({ currentCommunity: null }),
  clearUserCommunities: () => set({ userCommunities: [] }),
  
  // Optimistic update helpers
  updateCommunityInList: (communityId: string, updates: Partial<Group>) => {
    const { communities } = get()
    const updatedCommunities = communities.map(community =>
      community.id === communityId ? { ...community, ...updates } : community
    )
    set({ communities: updatedCommunities })
  },
  
  addCommunityToList: (community: Group) => {
    const { communities } = get()
    set({ communities: [community, ...communities] })
  },
  
  removeCommunityFromList: (communityId: string) => {
    const { communities } = get()
    const filteredCommunities = communities.filter(community => community.id !== communityId)
    set({ communities: filteredCommunities })
  },
}))

// Query options for React Query
const queryOptions = {
  refetchOnWindowFocus: false,
  refetchOnMount: true,
  refetchOnReconnect: true,
  staleTime: 5 * 60 * 1000, // 5 minutes
  retry: 2,
}

/**
 * Custom hook that combines React Query with Zustand for communities
 * Automatically syncs React Query data with the Zustand store
 */
export const useCommunitiesData = (length: number = 10) => {
  const { 
    communities, 
    setCommunities, 
    clearCommunities,
    updateCommunityInList,
    addCommunityToList,
    removeCommunityFromList
  } = useCommunitiesStore()

  // Store callbacks for automatic sync
  const storeCallbacks: StoreUpdateCallback = {
    setCommunities,
  }

  // Use the store-integrated hook
  const {
    data: communitiesFromQuery,
    isLoading,
    error,
    refetch,
    isRefetching,
    isFetching
  } = useCommunitiesWithStore(length, storeCallbacks, queryOptions)

  return {
    // Data
    communities,
    
    // Loading states
    isLoading,
    isRefetching,
    isFetching,
    
    // Error handling
    error,
    
    // Actions
    refetchCommunities: refetch,
    clearCommunities,
    
    // Optimistic updates
    updateCommunityInList,
    addCommunityToList,
    removeCommunityFromList,
    
    // Raw query data (in case needed)
    rawData: communitiesFromQuery,
  }
}

/**
 * Custom hook for user communities with store integration
 */
export const useUserCommunitiesData = (length: number = 10) => {
  const { 
    userCommunities, 
    setUserCommunities, 
    clearUserCommunities 
  } = useCommunitiesStore()

  // Store callbacks for automatic sync
  const storeCallbacks: StoreUpdateCallback = {
    setUserCommunities,
  }

  // Use the store-integrated hook
  const {
    data: userCommunitiesFromQuery,
    isLoading,
    error,
    refetch,
    isRefetching,
    isFetching
  } = useUserCommunitiesWithStore(length, storeCallbacks, queryOptions)

  return {
    // Data
    userCommunities,
    
    // Loading states
    isLoading,
    isRefetching,
    isFetching,
    
    // Error handling
    error,
    
    // Actions
    refetchUserCommunities: refetch,
    clearUserCommunities,
    
    // Raw query data
    rawData: userCommunitiesFromQuery,
  }
}

/**
 * Custom hook for a specific community with store integration
 */
export const useCommunityData = (communityId: string) => {
  const { 
    currentCommunity, 
    setCurrentCommunity, 
    clearCurrentCommunity 
  } = useCommunitiesStore()

  // Store callbacks for automatic sync
  const storeCallbacks: StoreUpdateCallback = {
    setCurrentCommunity,
  }

  // Use the store-integrated hook
  const {
    data: communityFromQuery,
    isLoading,
    error,
    refetch,
    isRefetching,
    isFetching
  } = useCommunityWithStore(communityId, storeCallbacks, queryOptions)

  return {
    // Data
    community: currentCommunity,
    
    // Loading states
    isLoading,
    isRefetching,
    isFetching,
    
    // Error handling
    error,
    
    // Actions
    refetchCommunity: refetch,
    clearCurrentCommunity,
    
    // Raw query data
    rawData: communityFromQuery,
  }
}

/**
 * Custom hook for updating communities with optimistic updates and store sync
 */
export const useUpdateCommunityData = () => {
  const { 
    setCurrentCommunity, 
    updateCommunityInList 
  } = useCommunitiesStore()

  // Store callbacks for automatic sync
  const storeCallbacks: StoreUpdateCallback = {
    setCurrentCommunity,
  }

  const updateMutation = useUpdateCommunityWithStore(storeCallbacks, {
    onMutate: async ({ communityId, data }) => {
      // Optimistically update the store
      updateCommunityInList(communityId, data)
      
      // Return the previous data for potential rollback
      return { communityId, data }
    },
    onError: (error, variables, context) => {
      // Rollback optimistic update if needed
      console.error('Failed to update community:', error)
      // You could implement rollback logic here if needed
    },
  })

  const updateCommunity = (communityId: string, data: Partial<Group>) => {
    updateMutation.mutate({ communityId, data })
  }

  return {
    updateCommunity,
    isUpdating: updateMutation.isPending,
    error: updateMutation.error,
    isSuccess: updateMutation.isSuccess,
    reset: updateMutation.reset,
  }
}

/**
 * Convenience hook that provides all community functionality in one place
 */


export const useCommunitiesManager = (options?: { 
  communitiesLength?: number; 
  userCommunitiesLength?: number; 
  currentCommunityId?: string;
}) => {
  const {
    communitiesLength = 10,
    userCommunitiesLength = 10,
    currentCommunityId,
  } = options || {}

  const communitiesData = useCommunitiesData(communitiesLength)
  const userCommunitiesData = useUserCommunitiesData(userCommunitiesLength)
  const communityData = useCommunityData(currentCommunityId || '')
  const updateCommunityData = useUpdateCommunityData()

  return {
    // All communities
    ...communitiesData,
    
    // User communities (prefixed to avoid conflicts)
    userCommunities: userCommunitiesData.userCommunities,
    isLoadingUserCommunities: userCommunitiesData.isLoading,
    userCommunitiesError: userCommunitiesData.error,
    refetchUserCommunities: userCommunitiesData.refetchUserCommunities,
    
    // Current community (prefixed to avoid conflicts)
    currentCommunity: communityData.community,
    isLoadingCurrentCommunity: communityData.isLoading,
    currentCommunityError: communityData.error,
    refetchCurrentCommunity: communityData.refetchCommunity,
    
    // Update functionality
    ...updateCommunityData,
  }
}

