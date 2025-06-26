
import techCommunity, { genListCommunities } from './mock-communities-extended';
import academicCommunity from './mock-communities-academic';
import gamingCommunity from './mock-communities-gaming';

// Collection of all community mock data
export const allCommunities = [
  techCommunity,
  academicCommunity,
  gamingCommunity
];
export const allCommunitiesWithLength = genListCommunities(1000);
export const createListCommunities = (length: number) => {
  
  return genListCommunities(length);
};
// Helper function to get a community by ID
export const getMockCommunityById = (id: string) => {
  return allCommunities.find(community => community.id === id);
};

// Helper function to get a random community
export const getRandomCommunity = () => {
  const randomIndex = Math.floor(Math.random() * allCommunities.length);
  return allCommunities[randomIndex];
};

export const getCommunitiesWithLength = (length: number) => {
  return genListCommunities(length);
};

export const getUserCommunities = (length: number) => {
  return genListCommunities(10);
};  

export {
  techCommunity,
  academicCommunity,
  gamingCommunity

}; 