
import techCommunity from './mock-communities-extended';
import academicCommunity from './mock-communities-academic';
import gamingCommunity from './mock-communities-gaming';

// Collection of all community mock data
export const allCommunities = [
  techCommunity,
  academicCommunity,
  gamingCommunity
];

// Helper function to get a community by ID
export const getCommunityById = (id: string) => {
  return allCommunities.find(community => community.id === id);
};

// Helper function to get a random community
export const getRandomCommunity = () => {
  const randomIndex = Math.floor(Math.random() * allCommunities.length);
  return allCommunities[randomIndex];
};

export {
  techCommunity,
  academicCommunity,
  gamingCommunity
}; 