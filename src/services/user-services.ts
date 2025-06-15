export interface User {
    id: string
    name: string
    email: string
    avatar?: string
    role: string
    perms: string[]
  }
  
export const mockGetUserInfo = async (): Promise<User> => {
    // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return mock user data
    return {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    role: "admin",
    perms: ["admin", "user", "guest"],
  };
};