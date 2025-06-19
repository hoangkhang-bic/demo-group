import { create } from 'zustand'
import { useEffect } from 'react'
import { User, useUpdateUserInfo, useUserInfo } from '@services/user-services'

// Define the store interface
interface UserStore {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

// Create the store with initial state
export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null })
}))

// Query options for React Query
const queryOptions = {
  refetchOnWindowFocus: false,
  refetchOnMount: true,
  refetchOnReconnect: true,
  staleTime: 5 * 60 * 1000, // 5 minutes
}

/**
 * Custom hook that combines React Query with Zustand
 * Automatically syncs the React Query data with the Zustand store
 */
// * this hook is use for get user data from query and update user data to query and store
export const useUserData = () => {
  const { user: storeUser, setUser, clearUser } = useUserStore()
  const {
    data: userFromQuery,
    isLoading,
    error,
    refetch
  } = useUserInfo(queryOptions)
  
  const updateUserMutation = useUpdateUserInfo()
  
  useEffect(() => {
    if (userFromQuery && !isLoading && !error) {
      setUser(userFromQuery)
    }
  }, [userFromQuery, isLoading, error, setUser])
  
  const updateUser = (userData: Partial<User>) => {
    if (storeUser) {
      const updatedUser = { ...storeUser, ...userData }
      
      setUser(updatedUser as User)
      
      updateUserMutation.mutate(userData, {
        onError: () => {
          if (storeUser) {
            setUser(storeUser)
          }
        }
      })
    } else {
      updateUserMutation.mutate(userData)
    }
  }
  
  return {
    user: storeUser,
    isLoading,
    error,
    
    fetchUser: refetch,
    updateUser,
    clearUser,
    
    isUpdating: updateUserMutation.isPending
  }
}

