import { mockUsers } from './mock-user-list';

// Helper function to get user data from mockUsers
const getUser = (index: number) => {
  const user = mockUsers[index % mockUsers.length]; // Use modulo to cycle through users if needed
  return {
    id: user.id,
    name: user.name,
    role: user.role,
    avatar: user.avatar
  };
};

// Gaming-themed mock data for community structures
const gamingCommunityMockData = {
  id: "com-04",
  name: "Gamer's Paradise",
  type: "main",
  icon: "🎮",
  color: "#9c27b0",
  memberCount: 48,
  isExpanded: false,
  groups: [
    {
      id: "fps-games",
      name: "FPS Games",
      type: "main",
      icon: "🔫",
      color: "#f44336",
      memberCount: 15,
      isExpanded: false,
      subGroups: [
        {
          id: "valorant",
          name: "Valorant",
          type: "subgroup",
          icon: "🎯",
          color: "#e91e63",
          memberCount: 5,
          parentId: "fps-games",
          members: [
            { ...getUser(0), role: "Team Captain" },
            { ...getUser(1), role: "Pro Player" },
            { ...getUser(2), role: "Semi-Pro" },
            { ...getUser(3), role: "Amateur" },
            { ...getUser(4), role: "Casual" }
          ]
        },
        {
          id: "csgo",
          name: "CS:GO",
          type: "subgroup",
          icon: "💣",
          color: "#ff9800",
          memberCount: 6,
          parentId: "fps-games",
          members: [
            { ...getUser(5), role: "Team Captain" },
            { ...getUser(6), role: "Sniper" },
            { ...getUser(0), role: "Entry Fragger" },
            { ...getUser(1), role: "Support" },
            { ...getUser(2), role: "Lurker" },
            { ...getUser(3), role: "IGL" }
          ]
        },
        {
          id: "apex",
          name: "Apex Legends",
          type: "subgroup",
          icon: "🛡️",
          color: "#ff5722",
          memberCount: 4,
          parentId: "fps-games",
          members: [
            { ...getUser(4), role: "Team Captain" },
            { ...getUser(5), role: "Recon Specialist" },
            { ...getUser(6), role: "Assault" },
            { ...getUser(0), role: "Support" }
          ]
        }
      ]
    },
    {
      id: "moba-games",
      name: "MOBA Games",
      type: "main",
      icon: "⚔️",
      color: "#2196f3",
      memberCount: 12,
      isExpanded: false,
      members: [
        { ...getUser(1), role: "Guild Leader" },
        { ...getUser(2), role: "Officer" },
        { ...getUser(3), role: "Officer" },
        { ...getUser(4), role: "Veteran" },
        { ...getUser(5), role: "Veteran" },
        { ...getUser(6), role: "Member" },
        { ...getUser(0), role: "Member" },
        { ...getUser(1), role: "Member" },
        { ...getUser(2), role: "Member" },
        { ...getUser(3), role: "Member" },
        { ...getUser(4), role: "Recruit" },
        { ...getUser(5), role: "Recruit" }
      ],
      subGroups: [
        {
          id: "lol",
          name: "League of Legends",
          type: "subgroup",
          icon: "🏆",
          color: "#3f51b5",
          memberCount: 5,
          parentId: "moba-games",
          isExpanded: false,
          subGroups: [
            {
              id: "lol-pro",
              name: "LoL Pro Team",
              type: "subgroup",
              icon: "🥇",
              color: "#ffc107",
              memberCount: 2,
              parentId: "lol",
              members: [
                { ...getUser(6), role: "Team Captain" },
                { ...getUser(0), role: "Coach" }
              ]
            }
          ],
          members: [
            { ...getUser(1), role: "Top Laner" },
            { ...getUser(2), role: "Jungler" },
            { ...getUser(3), role: "Mid Laner" },
            { ...getUser(4), role: "ADC" },
            { ...getUser(5), role: "Support" }
          ]
        }
      ]
    },
    {
      id: "rpg-games",
      name: "RPG Games",
      type: "main",
      icon: "🧙",
      color: "#4caf50",
      memberCount: 10,
      isExpanded: false,
      members: [
        { ...getUser(6), role: "Dungeon Master" },
        { ...getUser(0), role: "Warrior" },
        { ...getUser(1), role: "Mage" },
        { ...getUser(2), role: "Healer" },
        { ...getUser(3), role: "Rogue" },
        { ...getUser(4), role: "Paladin" },
        { ...getUser(5), role: "Ranger" },
        { ...getUser(6), role: "Druid" },
        { ...getUser(0), role: "Bard" },
        { ...getUser(1), role: "Necromancer" }
      ],
      subGroups: [
        {
          id: "wow",
          name: "World of Warcraft",
          type: "subgroup",
          icon: "🐉",
          color: "#673ab7",
          memberCount: 6,
          parentId: "rpg-games",
          members: [
            { ...getUser(2), role: "Guild Master" },
            { ...getUser(3), role: "Raid Leader" },
            { ...getUser(4), role: "Tank" },
            { ...getUser(5), role: "Healer" },
            { ...getUser(6), role: "DPS" },
            { ...getUser(0), role: "DPS" }
          ]
        },
        {
          id: "eso",
          name: "Elder Scrolls Online",
          type: "subgroup",
          icon: "🏹",
          color: "#795548",
          memberCount: 4,
          parentId: "rpg-games",
          members: [
            { ...getUser(1), role: "Guild Master" },
            { ...getUser(2), role: "Officer" },
            { ...getUser(3), role: "Crafter" },
            { ...getUser(4), role: "Member" }
          ]
        }
      ]
    },
    {
      id: "strategy",
      name: "Strategy Games",
      type: "main",
      icon: "♟️",
      color: "#009688",
      memberCount: 11,
      isExpanded: false,
      members: [
        { ...getUser(5), role: "Community Leader" },
        { ...getUser(6), role: "Moderator" },
        { ...getUser(0), role: "Moderator" },
        { ...getUser(1), role: "Tournament Organizer" },
        { ...getUser(2), role: "Content Creator" },
        { ...getUser(3), role: "Veteran" },
        { ...getUser(4), role: "Veteran" },
        { ...getUser(5), role: "Member" },
        { ...getUser(6), role: "Member" },
        { ...getUser(0), role: "Member" },
        { ...getUser(1), role: "Newbie" }
      ]
    }
  ]
};

const getGamingGroupMockData = (index: number) => {
  return gamingCommunityMockData.groups[index % gamingCommunityMockData.groups.length];
}

export default gamingCommunityMockData; 