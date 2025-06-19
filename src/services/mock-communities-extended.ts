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
  groups: [
    {
      id: "dev-team",
      name: "Development Team",
      type: "main",
      icon: "💻",
      color: "#fbbc05",
      memberCount: 18,
      isExpanded: false,
      subGroups: [
        {
          id: "frontend-dev",
          name: "Frontend Developers",
          type: "subgroup",
          icon: "🎨",
          color: "#ea4335",
          memberCount: 7,
          parentId: "dev-team",
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
          type: "subgroup",
          icon: "📱",
          color: "#9c27b0",
          memberCount: 6,
          parentId: "dev-team",
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
      subGroups: [
        {
          id: "product-design",
          name: "Product Design",
          type: "subgroup",
          icon: "🧩",
          color: "#00bcd4",
          memberCount: 4,
          parentId: "design-team",
          isExpanded: false,
          subGroups: [
            {
              id: "mobile-design",
              name: "Mobile Design",
              type: "subgroup",
              icon: "📱",
              color: "#3f51b5",
              memberCount: 2,
              parentId: "product-design",
              members: [
                { ...getUser(5), role: "Lead Designer" },
                { ...getUser(6), role: "Junior Designer" }
              ]
            }
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
      isExpanded: false,
      members: [
        { ...getUser(0), role: "CEO" },
        { ...getUser(1), role: "CTO" },
        { ...getUser(2), role: "COO" },
        { ...getUser(3), role: "Product Manager" },
        { ...getUser(4), role: "Project Manager" },
        { ...getUser(5), role: "HR Manager" }
      ]
    }
  ]
};

const getExtendedGroupMockData = (index: number) => {
  return extendedCommunityMockData.groups[index % extendedCommunityMockData.groups.length];
}

export default extendedCommunityMockData; 