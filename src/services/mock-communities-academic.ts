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

// Academic-themed mock data for community structures
const academicCommunityMockData = {
  id: "com-03",
  name: "University Network",
  type: "main",
  icon: "🎓",
  color: "#673ab7",
  memberCount: 56,
  isExpanded: false,
  groups: [
    {
      id: "cs-dept",
      name: "Computer Science",
      type: "main",
      icon: "💻",
      color: "#2196f3",
      memberCount: 22,
      isExpanded: false,
      groups: [
        {
          id: "ai-research",
          name: "AI Research Lab",
          type: "subgroup",
          icon: "🤖",
          color: "#e91e63",
          memberCount: 8,
          parentId: "cs-dept",
          members: [
            { ...getUser(0), role: "Lab Director" },
            { ...getUser(1), role: "Professor" },
            { ...getUser(2), role: "Associate Professor" },
            { ...getUser(3), role: "Post-Doc Researcher" },
            { ...getUser(4), role: "PhD Student" },
            { ...getUser(5), role: "PhD Student" },
            { ...getUser(6), role: "Masters Student" },
            { ...getUser(0), role: "Research Assistant" }
          ]
        },
        {
          id: "web-dev",
          name: "Web Development",
          type: "subgroup",
          icon: "🌐",
          color: "#ff9800",
          memberCount: 6,
          parentId: "cs-dept",
          members: [
            { ...getUser(1), role: "Professor" },
            { ...getUser(2), role: "Teaching Assistant" },
            { ...getUser(3), role: "Teaching Assistant" },
            { ...getUser(4), role: "Student" },
            { ...getUser(5), role: "Student" },
            { ...getUser(6), role: "Student" }
          ]
        },
        {
          id: "cybersec",
          name: "Cybersecurity",
          type: "subgroup",
          icon: "🔒",
          color: "#607d8b",
          memberCount: 8,
          parentId: "cs-dept",
          members: [
            { ...getUser(0), role: "Professor" },
            { ...getUser(1), role: "Associate Professor" },
            { ...getUser(2), role: "Assistant Professor" },
            { ...getUser(3), role: "PhD Student" },
            { ...getUser(4), role: "PhD Student" },
            { ...getUser(5), role: "Masters Student" },
            { ...getUser(6), role: "Masters Student" },
            { ...getUser(0), role: "Undergraduate" }
          ]
        }
      ]
    },
    {
      id: "math-dept",
      name: "Mathematics",
      type: "main",
      icon: "🧮",
      color: "#009688",
      memberCount: 15,
      isExpanded: false,
      members: [
        { ...getUser(1), role: "Department Chair" },
        { ...getUser(2), role: "Professor" },
        { ...getUser(3), role: "Professor" },
        { ...getUser(4), role: "Associate Professor" },
        { ...getUser(5), role: "Associate Professor" },
        { ...getUser(6), role: "Assistant Professor" },
        { ...getUser(0), role: "Assistant Professor" },
        { ...getUser(1), role: "Lecturer" },
        { ...getUser(2), role: "Post-Doc" },
        { ...getUser(3), role: "PhD Student" },
        { ...getUser(4), role: "PhD Student" },
        { ...getUser(5), role: "PhD Student" },
        { ...getUser(6), role: "Masters Student" },
        { ...getUser(0), role: "Masters Student" },
        { ...getUser(1), role: "Administrative Assistant" }
      ],
      groups: [
        {
          id: "applied-math",
          name: "Applied Mathematics",
          type: "subgroup",
          icon: "📊",
          color: "#4caf50",
          memberCount: 5,
          parentId: "math-dept",
          isExpanded: false,
          groups: [
            {
              id: "data-science",
              name: "Data Science",
              type: "subgroup",
              icon: "📈",
              color: "#9c27b0",
              memberCount: 3,
              parentId: "applied-math",
              members: [
                { ...getUser(2), role: "Professor" },
                { ...getUser(3), role: "Post-Doc" },
                { ...getUser(4), role: "PhD Student" }
              ]
            }
          ],
          members: [
            { ...getUser(5), role: "Professor" },
            { ...getUser(6), role: "Associate Professor" },
            { ...getUser(0), role: "Assistant Professor" },
            { ...getUser(1), role: "PhD Student" },
            { ...getUser(2), role: "Masters Student" }
          ]
        }
      ]
    },
    {
      id: "physics-dept",
      name: "Physics Department",
      type: "main",
      icon: "⚛️",
      color: "#ff5722",
      memberCount: 12,
      isExpanded: false,
      members: [
        { ...getUser(3), role: "Department Chair" },
        { ...getUser(4), role: "Professor" },
        { ...getUser(5), role: "Professor" },
        { ...getUser(6), role: "Associate Professor" },
        { ...getUser(0), role: "Associate Professor" },
        { ...getUser(1), role: "Assistant Professor" },
        { ...getUser(2), role: "Lecturer" },
        { ...getUser(3), role: "Post-Doc Researcher" },
        { ...getUser(4), role: "PhD Student" },
        { ...getUser(5), role: "PhD Student" },
        { ...getUser(6), role: "Masters Student" },
        { ...getUser(0), role: "Lab Technician" }
      ]
    },
    {
      id: "student-orgs",
      name: "Student Organizations",
      type: "main",
      icon: "🎭",
      color: "#795548",
      memberCount: 7,
      isExpanded: false,
      groups: [
        {
          id: "coding-club",
          name: "Coding Club",
          type: "subgroup",
          icon: "👨‍💻",
          color: "#3f51b5",
          memberCount: 4,
          parentId: "student-orgs",
          members: [
            { ...getUser(1), role: "President" },
            { ...getUser(2), role: "Vice President" },
            { ...getUser(3), role: "Secretary" },
            { ...getUser(4), role: "Treasurer" }
          ]
        },
        {
          id: "math-club",
          name: "Mathematics Society",
          type: "subgroup",
          icon: "➗",
          color: "#00bcd4",
          memberCount: 3,
          parentId: "student-orgs",
          members: [
            { ...getUser(5), role: "President" },
            { ...getUser(6), role: "Vice President" },
            { ...getUser(0), role: "Secretary" }
          ]
        }
      ]
    }
  ]
};

const getAcademicGroupMockData = (index: number) => {
  return academicCommunityMockData.groups[index % academicCommunityMockData.groups.length];
}

export default academicCommunityMockData; 