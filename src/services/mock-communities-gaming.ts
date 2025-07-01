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
  level: 0, // Root level (community)
  groups: [
    {
      id: "competitive-gaming",
      name: "Competitive Gaming",
      type: "main",
      icon: "🏆",
      color: "#f44336",
      memberCount: 150,
      isExpanded: false,
      level: 1,
      groups: [
        {
          id: "esports",
          name: "Esports",
          type: "group",
          icon: "🎮",
          color: "#e91e63",
          memberCount: 100,
          parentId: "competitive-gaming",
          level: 2,
          groups: [
            {
              id: "pro-teams",
              name: "Professional Teams",
              type: "group",
              icon: "👑",
              color: "#9c27b0",
              memberCount: 50,
              parentId: "esports",
              level: 3,
              groups: [
                {
                  id: "team-alpha",
                  name: "Team Alpha",
                  type: "group",
                  icon: "🔥",
                  color: "#673ab7",
                  memberCount: 25,
                  parentId: "pro-teams",
                  level: 4,
                  groups: [
                    {
                      id: "alpha-squad-a",
                      name: "Alpha Squad A",
                      type: "group",
                      icon: "⚡",
                      color: "#3f51b5",
                      memberCount: 15,
                      parentId: "team-alpha",
                      level: 5,
                      groups: [
                        {
                          id: "elite-players",
                          name: "Elite Players",
                          type: "group",
                          icon: "💫",
                          color: "#2196f3",
                          memberCount: 10,
                          parentId: "alpha-squad-a",
                          level: 6,
                          groups: [
                            {
                              id: "top-performers",
                              name: "Top Performers",
                              type: "group",
                              icon: "⭐",
                              color: "#03a9f4",
                              memberCount: 8,
                              parentId: "elite-players",
                              level: 7,
                              groups: [
                                {
                                  id: "champions",
                                  name: "Champions",
                                  type: "group",
                                  icon: "🏅",
                                  color: "#00bcd4",
                                  memberCount: 5,
                                  parentId: "top-performers",
                                  level: 8,
                                  groups: [
                                    {
                                      id: "legends",
                                      name: "Legends",
                                      type: "group",
                                      icon: "🌟",
                                      color: "#009688",
                                      memberCount: 3,
                                      parentId: "champions",
                                      level: 9,
                                      groups: [
                                        {
                                          id: "hall-of-fame",
                                          name: "Hall of Fame",
                                          type: "group",
                                          icon: "👑",
                                          color: "#4caf50",
                                          memberCount: 1,
                                          parentId: "legends",
                                          level: 10,
                                          members: [
                                            { ...getUser(0), role: "Ultimate Champion" }
                                          ]
                                        }
                                      ],
                                      members: [
                                        { ...getUser(0), role: "Legend" },
                                        { ...getUser(1), role: "Legend" },
                                        { ...getUser(2), role: "Legend" }
                                      ]
                                    }
                                  ],
                                  members: [
                                    { ...getUser(0), role: "Champion" },
                                    { ...getUser(1), role: "Champion" },
                                    { ...getUser(2), role: "Champion" },
                                    { ...getUser(3), role: "Champion" },
                                    { ...getUser(4), role: "Champion" }
                                  ]
                                }
                              ],
                              members: [
                                { ...getUser(0), role: "Top Player" },
                                { ...getUser(1), role: "Top Player" },
                                { ...getUser(2), role: "Top Player" },
                                { ...getUser(3), role: "Top Player" },
                                { ...getUser(4), role: "Top Player" },
                                { ...getUser(5), role: "Top Player" },
                                { ...getUser(6), role: "Top Player" },
                                { ...getUser(0), role: "Top Player" }
                              ]
                            }
                          ],
                          members: [
                            { ...getUser(1), role: "Elite" },
                            { ...getUser(2), role: "Elite" },
                            { ...getUser(3), role: "Elite" },
                            { ...getUser(4), role: "Elite" },
                            { ...getUser(5), role: "Elite" },
                            { ...getUser(6), role: "Elite" },
                            { ...getUser(0), role: "Elite" },
                            { ...getUser(1), role: "Elite" },
                            { ...getUser(2), role: "Elite" },
                            { ...getUser(3), role: "Elite" }
                          ]
                        }
                      ],
                      members: [
                        { ...getUser(4), role: "Squad Leader" },
                        { ...getUser(5), role: "Squad Member" },
                        { ...getUser(6), role: "Squad Member" },
                        { ...getUser(0), role: "Squad Member" },
                        { ...getUser(1), role: "Squad Member" }
                      ]
                    }
                  ],
                  members: [
                    { ...getUser(2), role: "Team Captain" },
                    { ...getUser(3), role: "Team Manager" },
                    { ...getUser(4), role: "Team Coach" },
                    { ...getUser(5), role: "Team Analyst" },
                    { ...getUser(6), role: "Team Member" }
                  ]
                }
              ],
              members: [
                { ...getUser(5), role: "Esports Director" },
                { ...getUser(6), role: "Tournament Organizer" },
                { ...getUser(0), role: "League Manager" },
                { ...getUser(1), role: "Broadcast Manager" },
                { ...getUser(2), role: "Community Manager" }
              ]
            }
          ],
          members: [
            { ...getUser(3), role: "Gaming Director" },
            { ...getUser(4), role: "Operations Manager" },
            { ...getUser(5), role: "Marketing Manager" },
            { ...getUser(6), role: "Content Creator" },
            { ...getUser(0), role: "Community Leader" }
          ]
        }
      ]
    },
    {
      id: "fps-games",
      name: "FPS Games",
      type: "main",
      icon: "🔫",
      color: "#f44336",
      memberCount: 15,
      isExpanded: false,
      level: 1, // First level group
      groups: [ // Changed from subGroups to groups for consistency
        {
          id: "valorant",
          name: "Valorant",
          type: "group",
          icon: "🎯",
          color: "#e91e63",
          memberCount: 5,
          parentId: "fps-games",
          level: 2, // Second level group
          groups: [
            {
              id: "valorant-pro",
              name: "Valorant Pro Team",
              type: "group",
              icon: "🏆",
              color: "#ffc107",
              memberCount: 3,
              parentId: "valorant",
              level: 3, // Third level group
              members: [
                { ...getUser(0), role: "Team Captain" },
                { ...getUser(1), role: "Pro Player" },
                { ...getUser(2), role: "Semi-Pro" }
              ]
            },
            {
              id: "valorant-casual",
              name: "Valorant Casual",
              type: "group",
              icon: "🎮",
              color: "#4caf50",
              memberCount: 2,
              parentId: "valorant",
              level: 3,
              members: [
                { ...getUser(3), role: "Amateur" },
                { ...getUser(4), role: "Casual" }
              ]
            }
          ],
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
          type: "group",
          icon: "💣",
          color: "#ff9800",
          memberCount: 6,
          parentId: "fps-games",
          level: 2,
          groups: [
            {
              id: "csgo-competitive",
              name: "CS:GO Competitive",
              type: "group",
              icon: "🎯",
              color: "#ff5722",
              memberCount: 4,
              parentId: "csgo",
              level: 3,
              members: [
                { ...getUser(5), role: "Team Captain" },
                { ...getUser(6), role: "Sniper" },
                { ...getUser(0), role: "Entry Fragger" },
                { ...getUser(1), role: "Support" }
              ]
            }
          ],
          members: [
            { ...getUser(5), role: "Team Captain" },
            { ...getUser(6), role: "Sniper" },
            { ...getUser(0), role: "Entry Fragger" },
            { ...getUser(1), role: "Support" },
            { ...getUser(2), role: "Lurker" },
            { ...getUser(3), role: "IGL" }
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
      level: 1,
      groups: [
        {
          id: "lol",
          name: "League of Legends",
          type: "group",
          icon: "🏆",
          color: "#3f51b5",
          memberCount: 5,
          parentId: "moba-games",
          level: 2,
          groups: [
            {
              id: "lol-pro",
              name: "LoL Pro Team",
              type: "group",
              icon: "🥇",
              color: "#ffc107",
              memberCount: 2,
              parentId: "lol",
              level: 3,
              members: [
                { ...getUser(6), role: "Team Captain" },
                { ...getUser(0), role: "Coach" }
              ]
            },
            {
              id: "lol-academy",
              name: "LoL Academy",
              type: "group",
              icon: "🎓",
              color: "#9c27b0",
              memberCount: 3,
              parentId: "lol",
              level: 3,
              members: [
                { ...getUser(1), role: "Top Laner" },
                { ...getUser(2), role: "Jungler" },
                { ...getUser(3), role: "Mid Laner" }
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
      ],
      members: [
        { ...getUser(1), role: "Guild Leader" },
        { ...getUser(2), role: "Officer" },
        { ...getUser(3), role: "Officer" },
        { ...getUser(4), role: "Veteran" },
        { ...getUser(5), role: "Veteran" },
        { ...getUser(6), role: "Member" }
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
      ],
      groups: [
        {
          id: "strategy-games",
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
          ]
        }
      ]
    }
  ]
};

const getGamingGroupMockData = (index: number) => {
  return gamingCommunityMockData.groups[index % gamingCommunityMockData.groups.length];
}

export default gamingCommunityMockData; 