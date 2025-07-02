import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { allCommunities, createNewGroup, getGroupById, getListCommunities} from './mock-communities-index';
import { Community, Group } from './communities-services';

export interface GroupMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface CreateGroupParams extends Partial<Group> {
  name: string;
  description: string;
  icon: string;
  color: string;
  type: "public" | "private" | "secret";
  parentId?: string;
}

// Mock data

// API Functions

const mockGroups = async (): Promise<Community[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  return getListCommunities();
};

const fetchGroups = async (communityId?: string): Promise<Community[] | null> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  if (communityId) {
    return (await mockGroups()).filter(communities => communities.id === communityId);
  }
  return null;
};

const fetchGroupById = async (groupId: string): Promise<Group | null> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  if (groupId) {
    return getGroupById(groupId) as Group;
  }
  return null;
};

// Query Keys
const groupKeys = {
  all: ['groups'] as const,
  lists: () => [...groupKeys.all, 'list'] as const,
  list: (filters: string) => [...groupKeys.lists(), { filters }] as const,
  details: () => [...groupKeys.all, 'detail'] as const,
  detail: (id: string) => [...groupKeys.details(), id] as const,
};

// Hooks
export const useGroups = (communityId?: string) => {
  return useQuery({
    queryKey: groupKeys.list(communityId || 'all'),
    queryFn: () => fetchGroups(communityId),
  });
};

export const useGroupById = (groupId: string) => {
  return useQuery({
    queryKey: groupKeys.detail(groupId),
    queryFn: () => fetchGroupById(groupId),
  });
};

export const useGroupList = () => {
  return useQuery({
    queryKey: groupKeys.list('all'),
    queryFn: () => fetchGroups(),
  });
};

export const createGroup = async (data: CreateGroupParams, parentCommunityId?: string, parentGroupId?: string): Promise<Group> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  
  // In a real app, this would be an API call
  const newGroup: Group = {
    id: `group-${Date.now()}`,
    name: data.name,
    description: data.description,
    icon: data.icon,
    color: data.color,
    type: data.type,
    parentId: data.parentId,
    memberCount: 1,
    members: [],
    avatarUrl: data.icon,
    isExpanded: false,
    groups: [],
  };
   
  createNewGroup(newGroup,parentCommunityId, parentGroupId);
  return newGroup;
};

export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn:({
      data,
      parentCommunityId,
      parentGroupId,
    }: {
      data: CreateGroupParams;
      parentCommunityId?: string;
      parentGroupId?: string;
    }) => createGroup(data, parentCommunityId, parentGroupId),
    onSuccess: (newGroup) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: groupKeys.lists() });
      
      // Optionally update the cache directly
      queryClient.setQueryData(groupKeys.detail(newGroup.id), newGroup);
    },
  });
};

export const updateGroup = async (group: Group) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  return getGroupById(group.id) as Group;
};

export const deleteGroup = async (groupId: string) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  return getGroupById(groupId) as Group;
};

