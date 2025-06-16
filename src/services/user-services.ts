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
    avatar: "https://konachan.net/image/219bc0c7cd94fc7b388e7646e416e011/Konachan.com%20-%20389912%20barefoot%20black_hair%20blue_archive%20blush%20chinese_dress%20dress%20gray_eyes%20halo%20long_hair%20momobug22%20red%20ryuuge_kisaki%20signed%20twintails%20watermark.jpg",
    role: "admin",
    perms: ["admin", "user", "guest"],
  };
};