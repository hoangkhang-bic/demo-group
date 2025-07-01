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

// Extended mock data for community structures
const extendedCommunityMockData = {
  id: "com-02",
  name: "Tech Innovators",
  type: "main",
  icon: "🚀",
  color: "#34a853",
  memberCount: 42,
  isExpanded: false,
  avatarUrl: "https://picsum.photos/200/300",
  groups: [
    {
      id: "dev-team",
      name: "Development Team",
      type: "public",
      icon: "💻",
      color: "#fbbc05",
      memberCount: 18,
      isExpanded: false,
      description: "This is the development team",
      isVerified: true,
      isPinned: true,
      level: 1,
      avatarUrl: "https://picsum.photos/200/300",
      groups: [
        {
          id: "frontend-dev",
          name: "Frontend Developers",
          type: "subgroup",
          icon: "🎨",
          color: "#ea4335",
          memberCount: 7,
          parentId: "dev-team",
          description: "This is the frontend developers",
          isVerified: true,
          isPinned: true,
          level: 2,
          avatarUrl: "https://picsum.photos/200/300",
          members: [
            { ...getUser(0), role: "Team Lead" },
            { ...getUser(1), role: "Senior Developer" },
            { ...getUser(2), role: "Developer" },
            { ...getUser(3), role: "Developer" },
            { ...getUser(4), role: "Junior Developer" },
            { ...getUser(5), role: "Junior Developer" },
            { ...getUser(6), role: "Intern" }
          ]
        },
        {
          id: "backend-dev",
          name: "Backend Developers",
          type: "subgroup",
          icon: "⚙️",
          color: "#4285f4",
          memberCount: 5,
          parentId: "dev-team",
          avatarUrl: "https://picsum.photos/200/300",
          members: [
            { ...getUser(3), role: "Team Lead" },
            { ...getUser(4), role: "Senior Developer" },
            { ...getUser(5), role: "Developer" },
            { ...getUser(6), role: "Developer" },
            { ...getUser(0), role: "Junior Developer" }
          ]
        },
        {
          id: "mobile-dev",
          name: "Mobile Developers",
          type: "private",
          icon: "📱",
          color: "#9c27b0",
          memberCount: 6,
          parentId: "dev-team",
          avatarUrl: "https://picsum.photos/200/300",
          members: [
            { ...getUser(1), role: "Team Lead" },
            { ...getUser(2), role: "iOS Developer" },
            { ...getUser(3), role: "iOS Developer" },
            { ...getUser(4), role: "Android Developer" },
            { ...getUser(5), role: "Android Developer" },
            { ...getUser(6), role: "Flutter Developer" }
          ]
        }
      ]
    },
    {
      id: "design-team",
      name: "Design Team",
      type: "main",
      icon: "🎭",
      color: "#ff6d01",
      memberCount: 10,
      isExpanded: false,
      avatarUrl: "https://picsum.photos/200/300",
      members: [
        { ...getUser(2), role: "Design Director" },
        { ...getUser(3), role: "UI Designer" },
        { ...getUser(4), role: "UX Designer" },
        { ...getUser(5), role: "Graphic Designer" },
        { ...getUser(6), role: "Motion Designer" },
        { ...getUser(0), role: "UI Designer" },
        { ...getUser(1), role: "UX Researcher" },
        { ...getUser(2), role: "Product Designer" },
        { ...getUser(3), role: "Illustrator" },
        { ...getUser(4), role: "Design Intern" }
      ],
      groups: [
        {
          id: "product-design",
          name: "Product Design",
          type: "subgroup",
          icon: "🧩",
          color: "#00bcd4",
          memberCount: 4,
          parentId: "design-team",
          isExpanded: false,
          avatarUrl: "https://picsum.photos/200/300",
          groups: [
            {
              id: "mobile-design",
              name: "Mobile Design",
              type: "subgroup",
              icon: "📱",
              color: "#3f51b5",
              memberCount: 2,
              parentId: "product-design",
              avatarUrl: "https://picsum.photos/200/300",
              members: [
                { ...getUser(5), role: "Lead Designer" },
                { ...getUser(6), role: "Junior Designer" }
              ]
            },
            {
              id: "design-team-1",
              name: "Design Team",
              type: "subgroup",
              icon: "📱",
              color: "#3f51b5",
              memberCount: 2,
              parentId: "product-design",
              avatarUrl: "https://picsum.photos/200/300",
              members: [
                { ...getUser(5), role: "Lead Designer" },
                { ...getUser(6), role: "Junior Designer" }
              ],
              groups: [
                {
                  id: "mobile-design",
                  name: "Mobile Design",
                  type: "subgroup",
                  icon: "📱",
                  color: "#3f51b5",
                  memberCount: 2,
                  parentId: "design-team-1",
                  avatarUrl: "https://picsum.photos/200/300",
                  members: [
                    { ...getUser(5), role: "Lead Designer" },
                    { ...getUser(6), role: "Junior Designer" }
                  ]
                }
              ] 
            },
          ],
          members: [
            { ...getUser(0), role: "Lead Designer" },
            { ...getUser(1), role: "Senior Designer" },
            { ...getUser(2), role: "Designer" },
            { ...getUser(3), role: "Junior Designer" }
          ]
        }
      ]
    },
    {
      id: "qa-team",
      name: "Quality Assurance",
      type: "main",
      icon: "🔍",
      color: "#8bc34a",
      memberCount: 8,
      avatarUrl: "https://picsum.photos/200/300",
      isExpanded: false,
      members: [
        { ...getUser(4), role: "QA Manager" },
        { ...getUser(5), role: "QA Engineer" },
        { ...getUser(6), role: "QA Engineer" },
        { ...getUser(0), role: "QA Engineer" },
        { ...getUser(1), role: "QA Engineer" },
        { ...getUser(2), role: "Automation Tester" },
        { ...getUser(3), role: "Manual Tester" },
        { ...getUser(4), role: "QA Intern" }
      ]
    },
    {
      id: "management",
      name: "Management",
      type: "main",
      icon: "👔",
      color: "#607d8b",
      memberCount: 6,
      avatarUrl: "https://picsum.photos/200/300",
      isExpanded: false,
      groups: [
        {
          id: "management-team",
          name: "Management Team",
          type: "subgroup",
          icon: "👔",
          color: "#607d8b", 
          memberCount: 6,
          avatarUrl: "https://picsum.photos/200/300",
          members: [
            { ...getUser(0), role: "CEO" },
            { ...getUser(1), role: "CTO" },
            { ...getUser(2), role: "COO" },
            { ...getUser(3), role: "Product Manager" },
            { ...getUser(4), role: "Project Manager" },
            { ...getUser(5), role: "HR Manager" }
          ]
        }
      ],
      members: [
        { ...getUser(0), role: "CEO" },
        { ...getUser(1), role: "CTO" },
        { ...getUser(2), role: "COO" },
        { ...getUser(3), role: "Product Manager" },
        { ...getUser(4), role: "Project Manager" },
        { ...getUser(5), role: "HR Manager" }
      ]
    }
  ],
  
};

export const genListCommunities = (length: number) => {
  const communityNames = [
    "Tech Innovators",
    "Digital Creators",
    "Code Warriors",
    "Future Builders",
    "Innovation Hub",
    "Dev Masters",
    "Tech Pioneers",
    "Digital Nomads",
    "Creative Coders",
    "Tech Visionaries"
  ];

  const communityIcons = ["🚀", "💻", "🎯", "⚡", "🔥", "🌟", "💡", "🎨", "🛠️", "🎭"];
  const communityColors = [
    "#34a853", "#4285f4", "#ea4335", "#fbbc05", "#9c27b0", 
    "#ff6d01", "#00bcd4", "#8bc34a", "#607d8b", "#e91e63"
  ];

  return Array.from({ length }, (_, index) => {
    const communityIndex = index % communityNames.length;
    const result = {
      ...extendedCommunityMockData,
      id: `com-${String(index + 1).padStart(2, '0')}`,
      name: communityNames[communityIndex],
      icon: communityIcons[communityIndex],
      color: communityColors[communityIndex],
      avatarUrl: "https://picsum.photos/200/300",
      memberCount: Math.floor(Math.random() * 50) + 20, // Random member count between 20-69
             groups: extendedCommunityMockData.groups.map((group, groupIndex) => ({
         ...group,
         id: `${group.id}-${index + 1}`,
         memberCount: Math.floor(Math.random() * 25) + 5, // Random member count for groups
         groups: group.groups?.map((subGroup: any, subIndex) => ({
           ...subGroup,
           id: `${subGroup.id}-${index + 1}`,
           parentId: `${group.id}-${index + 1}`,
           memberCount: Math.floor(Math.random() * 10) + 2, // Random member count for subgroups
           ...(subGroup.groups && {
            groups: subGroup.groups.map((nestedSubGroup: any, nestedIndex: number) => ({
               ...nestedSubGroup,
               id: `${nestedSubGroup.id}-${index + 1}`,
               parentId: `${subGroup.id}-${index + 1}`,
               memberCount: Math.floor(Math.random() * 5) + 1
             }))
           })
         }))
       }))
    };
    return result;
  });
};

export default extendedCommunityMockData; 