
import techCommunity, { genListCommunities } from './mock-communities-extended';
import academicCommunity from './mock-communities-academic';
import gamingCommunity from './mock-communities-gaming';
import { Community, Group } from './communities-services';

// Collection of all community mock data
export const allCommunities = [
  techCommunity,
  academicCommunity,
  gamingCommunity
];
const findGroupById = (data: any, targetId: string) => {
  const searchInGroup = (group: any): any => {
    // Check if current group matches
    if (group.id === targetId) {
      return group;
    }
    
    // Search in subgroups if they exist
    if (group.groups && group.groups.length > 0) {
      for (const subGroup of group.groups) {
        const found = searchInGroup(subGroup);
        if (found) return found;
      }
    }
    
    return null;
  }
  
  // Search through all top-level items
  for (const item of data) {
    const found = searchInGroup(item);
    if (found) return found;
  }
  
  return null;
}
class  CommunityData {
  static allCommunities = [
    techCommunity,
    academicCommunity,
    gamingCommunity
  ] as Community[];
  
  static getCommunityById = (id: string) => {
    return this.allCommunities.find(community => community.id === id);
  };
  static getRandomCommunity = () => {
    const randomIndex = Math.floor(Math.random() * this.allCommunities.length);
    return this.allCommunities[randomIndex];
  };
  static getCommunityList = () => {
    return this.allCommunities;
  };
  static updateCommunity = ({community, data}: {community: Community, data: Partial<Community>}): Community => {
    return {
      ...community,
      ...data
    };
  };

  
 
  static createCommunity = (data: Partial<Community>): Community => { 
    if (!data.name) {
      throw new Error("Name is required");
    }
    const newCommunity = {
      ...data,
      id: `community-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: data.type || "public",
      memberCount: data.memberCount || 0,
      isExpanded: data.isExpanded || false,
      level: data.level || 0,
      groups: data.groups || [],
    };
    this.allCommunities.push(newCommunity as unknown as Community);
    return newCommunity as unknown as Community;
  }
  static getGroupById = (groupId: string, rootCommunityId?: string) => {
    const parent = this.allCommunities.find(e=>e.id === rootCommunityId);
    const group = findGroupById(parent?.groups || [], groupId);
    return group;
  };
  static CreateGroup = (data: Partial<Group>, parentCommunity?: string, {
    parentGroupId,
  }: {
    parentGroupId?: string;
  } = {}): void => {
    if(parentCommunity === parentGroupId) {
      const community = this.getCommunityById(parentCommunity || "");
      if(community) {
        community.groups?.push(data as unknown as Group);
      }
      return;
    }
    if (parentGroupId) {
      const parentGroup = this.getGroupById(parentGroupId, parentCommunity);
      if (parentGroup) {
        if(parentGroup?.groups) {
          parentGroup?.groups?.push(data as unknown as Group);
        } else {
          parentGroup.groups = [data as unknown as Group];
        }
      } else {
        throw new Error("Parent group not found");
      }
    }
  }
  static getGroupByCommunityId = (communityId: string) => {
    return this.allCommunities.find(community => community.id === communityId)?.groups;
  }
}
export const allCommunitiesWithLength = genListCommunities(1000);
export const createListCommunities = (length: number) => {
  
  return genListCommunities(length);
};
// Helper function to get a community by ID
export const getMockCommunityById = (id: string) => {
  return CommunityData.getCommunityById(id);
};

// Helper function to get a random community
export const getRandomCommunity = () => {
  const randomIndex = Math.floor(Math.random() * allCommunities.length);
  return allCommunities[randomIndex];
};

export const getCommunitiesWithLength = (length: number) => {
  console.log("getCommunitiesWithLength", length);
  console.log("genListCommunities", genListCommunities(length));
  return genListCommunities(length);
};

export const getUserCommunities = (length: number) => {
  return genListCommunities(10);
};  

export const getListCommunities = async () => {
  return CommunityData.getCommunityList();
};

export const getGroupList =  () => {
  return allCommunities.map(community => community.groups).flat(10);
}

export const getGroupByCommunityId = (communityId: string) => {
  return CommunityData.getGroupByCommunityId(communityId);
}

export const getGroupById = (groupId: string) => {
  const groups = getGroupList()
  return groups.find(group => group.id === groupId);
};
export const createNewGroup = (data: Partial<Group>, parentCommunityId?: string, parentGroupId?: string) => {
  CommunityData.CreateGroup(data, parentCommunityId,{
    parentGroupId: parentGroupId
  });
} 
export {
  techCommunity,
  academicCommunity,
  gamingCommunity

}; 