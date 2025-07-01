import { mockUsers } from './mock-user-list';

interface Member {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

interface Group {
  id: string;
  name: string;
  type: "main" | "subgroup";
  icon: string;
  color: string;
  memberCount: number;
  parentId?: string;
  isExpanded?: boolean;
  members: Member[];
  groups?: Group[];
}

interface Community {
  id: string;
  name: string;
  type: "main";
  icon: string;
  color: string;
  memberCount: number;
  isExpanded: boolean;
  groups: Group[];
}

// Helper function to get user data from mockUsers
const getUser = (index: number) => {
  const user = mockUsers[index % mockUsers.length];
  return {
    id: user.id,
    name: user.name,
    role: user.role,
    avatar: user.avatar
  };
};

// Deep nested mock data with 10 levels
const deepNestedCommunityMockData = {
  id: "deep-com-01",
  name: "Deep Tech Organization",
  type: "main",
  icon: "🌐",
  color: "#34a853",
  memberCount: 100,
  isExpanded: false,
  groups: [
    {
      id: "level-1",
      name: "Level 1 Division",
      type: "main",
      icon: "🏢",
      color: "#4285f4",
      memberCount: 90,
      isExpanded: false,
      groups: [
        {
          id: "level-2",
          name: "Level 2 Department",
          type: "subgroup",
          icon: "🏗️",
          color: "#ea4335",
          memberCount: 80,
          parentId: "level-1",
          groups: [
            {
              id: "level-3",
              name: "Level 3 Unit",
              type: "subgroup",
              icon: "🏭",
              color: "#fbbc05",
              memberCount: 70,
              parentId: "level-2",
              groups: [
                {
                  id: "level-4",
                  name: "Level 4 Team",
                  type: "subgroup",
                  icon: "👥",
                  color: "#9c27b0",
                  memberCount: 60,
                  parentId: "level-3",
                  groups: [
                    {
                      id: "level-5",
                      name: "Level 5 Squad",
                      type: "subgroup",
                      icon: "👨‍💻",
                      color: "#ff6d01",
                      memberCount: 50,
                      parentId: "level-4",
                      groups: [
                        {
                          id: "level-6",
                          name: "Level 6 Cell",
                          type: "subgroup",
                          icon: "🔬",
                          color: "#00bcd4",
                          memberCount: 40,
                          parentId: "level-5",
                          groups: [
                            {
                              id: "level-7",
                              name: "Level 7 Pod",
                              type: "subgroup",
                              icon: "🎯",
                              color: "#3f51b5",
                              memberCount: 30,
                              parentId: "level-6",
                              groups: [
                                {
                                  id: "level-8",
                                  name: "Level 8 Cluster",
                                  type: "subgroup",
                                  icon: "🎲",
                                  color: "#8bc34a",
                                  memberCount: 20,
                                  parentId: "level-7",
                                  groups: [
                                    {
                                      id: "level-9",
                                      name: "Level 9 Group",
                                      type: "subgroup",
                                      icon: "🎮",
                                      color: "#607d8b",
                                      memberCount: 10,
                                      parentId: "level-8",
                                      groups: [
                                        {
                                          id: "level-10",
                                          name: "Level 10 Core",
                                          type: "subgroup",
                                          icon: "⚛️",
                                          color: "#e91e63",
                                          memberCount: 5,
                                          parentId: "level-9",
                                          members: [
                                            { ...getUser(0), role: "Core Lead" },
                                            { ...getUser(1), role: "Core Senior" },
                                            { ...getUser(2), role: "Core Developer" },
                                            { ...getUser(3), role: "Core Junior" },
                                            { ...getUser(4), role: "Core Intern" }
                                          ]
                                        }
                                      ],
                                      members: [
                                        { ...getUser(5), role: "Group Lead" },
                                        { ...getUser(6), role: "Group Senior" },
                                        { ...getUser(0), role: "Group Developer" }
                                      ]
                                    }
                                  ],
                                  members: [
                                    { ...getUser(1), role: "Cluster Lead" },
                                    { ...getUser(2), role: "Cluster Senior" },
                                    { ...getUser(3), role: "Cluster Developer" }
                                  ]
                                }
                              ],
                              members: [
                                { ...getUser(4), role: "Pod Lead" },
                                { ...getUser(5), role: "Pod Senior" },
                                { ...getUser(6), role: "Pod Developer" }
                              ]
                            }
                          ],
                          members: [
                            { ...getUser(0), role: "Cell Lead" },
                            { ...getUser(1), role: "Cell Senior" },
                            { ...getUser(2), role: "Cell Developer" }
                          ]
                        }
                      ],
                      members: [
                        { ...getUser(3), role: "Squad Lead" },
                        { ...getUser(4), role: "Squad Senior" },
                        { ...getUser(5), role: "Squad Developer" }
                      ]
                    }
                  ],
                  members: [
                    { ...getUser(6), role: "Team Lead" },
                    { ...getUser(0), role: "Team Senior" },
                    { ...getUser(1), role: "Team Developer" }
                  ]
                }
              ],
              members: [
                { ...getUser(2), role: "Unit Lead" },
                { ...getUser(3), role: "Unit Senior" },
                { ...getUser(4), role: "Unit Developer" }
              ]
            }
          ],
          members: [
            { ...getUser(5), role: "Department Lead" },
            { ...getUser(6), role: "Department Senior" },
            { ...getUser(0), role: "Department Developer" }
          ]
        }
      ],
      members: [
        { ...getUser(1), role: "Division Lead" },
        { ...getUser(2), role: "Division Senior" },
        { ...getUser(3), role: "Division Developer" }
      ]
    }
  ]
};

// Helper function to generate nested groups
const generateNestedGroups = (currentDepth: number, maxDepth: number, parentId?: string): Group[] => {
  if (currentDepth > maxDepth) return [];

  const levelName = [
    "Division", "Department", "Unit", "Team", "Squad",
    "Cell", "Pod", "Cluster", "Group", "Core"
  ][currentDepth - 1] || `Level ${currentDepth}`;

  const group: Group = {
    id: `level-${currentDepth}`,
    name: `Level ${currentDepth} ${levelName}`,
    type: currentDepth === 1 ? "main" : "subgroup",
    icon: ["🏢", "🏗️", "🏭", "👥", "👨‍💻", "🔬", "🎯", "🎲", "🎮", "⚛️"][currentDepth - 1] || "📍",
    color: [
      "#4285f4", "#ea4335", "#fbbc05", "#9c27b0", "#ff6d01",
      "#00bcd4", "#3f51b5", "#8bc34a", "#607d8b", "#e91e63"
    ][currentDepth - 1] || "#000000",
    memberCount: Math.max(100 - (currentDepth * 10), 5),
    parentId,
    isExpanded: false,
    members: [
      { ...getUser((currentDepth * 3) % mockUsers.length), role: `${levelName} Lead` },
      { ...getUser((currentDepth * 3 + 1) % mockUsers.length), role: `${levelName} Senior` },
      { ...getUser((currentDepth * 3 + 2) % mockUsers.length), role: `${levelName} Developer` }
    ]
  };

  const nestedGroups = generateNestedGroups(currentDepth + 1, maxDepth, group.id);
  if (nestedGroups.length > 0) {
    group.groups = nestedGroups;
  }

  return [group];
};

export const genDeepNestedCommunities = (length: number, deep: number): Community[] => {
  const communityNames = [
    "Deep Tech Organization",
    "Nested Systems Corp",
    "Hierarchy Solutions",
    "Depth Dynamics",
    "Layer Technologies",
    "Structure Innovations",
    "Nested Networks",
    "Deep Digital",
    "Level Labs",
    "Tier Tech"
  ];

  const communityIcons = ["🌐", "🏢", "🏗️", "🏭", "👥", "👨‍💻", "🔬", "🎯", "🎲", "⚛️"];
  const communityColors = [
    "#34a853", "#4285f4", "#ea4335", "#fbbc05", "#9c27b0",
    "#ff6d01", "#00bcd4", "#3f51b5", "#8bc34a", "#e91e63"
  ];

  return Array.from({ length }, (_, index) => {
    const communityIndex = index % communityNames.length;
    return {
      id: `deep-com-${String(index + 1).padStart(2, '0')}`,
      name: communityNames[communityIndex],
      type: "main",
      icon: communityIcons[communityIndex],
      color: communityColors[communityIndex],
      memberCount: Math.floor(Math.random() * 150) + 50,
      isExpanded: false,
      groups: generateNestedGroups(1, deep)
    };
  });
};

export default deepNestedCommunityMockData; 