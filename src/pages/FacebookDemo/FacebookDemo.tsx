import React, { useState } from "react";
import View from "@/components/View/View";
import FacebookItem from "@/components/facebook-item/facebook-item";
import "./FacebookDemo.css";

export default function FacebookDemo() {
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});

  const handleLike = (postId: number) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const demoData = [
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "https://via.placeholder.com/150?text=John",
        timestamp: "2 hours ago",
      },
      content: {
        text: "Just had an amazing day at the beach! The weather was perfect and the sunset was breathtaking. Can't wait to go back next weekend!",
        images: ["https://via.placeholder.com/800x500?text=Beach+Day"],
      },
      stats: {
        likes: 42,
        comments: 8,
        shares: 3,
      },
    },
    {
      id: 2,
      user: {
        name: "Jane Smith",
        avatar: "https://via.placeholder.com/150?text=Jane",
        timestamp: "Yesterday at 3:45 PM",
      },
      content: {
        text: "Check out these photos from our hiking trip!",
        images: [
          "https://via.placeholder.com/400x300?text=Hiking+1",
          "https://via.placeholder.com/400x300?text=Hiking+2",
          "https://via.placeholder.com/400x300?text=Hiking+3",
          "https://via.placeholder.com/400x300?text=Hiking+4",
        ],
      },
      stats: {
        likes: 128,
        comments: 24,
        shares: 12,
      },
    },
    {
      id: 3,
      user: {
        name: "Tech News",
        avatar: "https://via.placeholder.com/150?text=Tech",
        timestamp: "3 days ago",
      },
      content: {
        text: "Breaking: The latest smartphone model has just been announced with groundbreaking features including a foldable screen, 2-day battery life, and advanced AI capabilities. What do you think about these innovations?",
      },
      stats: {
        likes: 315,
        comments: 87,
        shares: 42,
      },
    },
    {
      id: 4,
      user: {
        name: "Foodie Adventures",
        avatar: "https://via.placeholder.com/150?text=Food",
        timestamp: "5 hours ago",
      },
      content: {
        text: "Made this delicious homemade pasta today! Recipe in comments.",
        images: [
          "https://via.placeholder.com/400x300?text=Pasta+1",
          "https://via.placeholder.com/400x300?text=Pasta+2",
        ],
      },
      stats: {
        likes: 89,
        comments: 14,
        shares: 5,
      },
    },
  ];

  return (
    <View
      className="facebook-demo-container"
      padding={16}
      flexDirection="column"
    >
      <h1 className="facebook-demo-title">Facebook Feed Demo</h1>

      <View className="facebook-feed" flexDirection="column" gap={16}>
        {demoData.map((post) => (
          <FacebookItem
            key={post.id}
            user={post.user}
            content={post.content}
            stats={post.stats}
            liked={likedPosts[post.id]}
            onLike={() => handleLike(post.id)}
            onComment={() => alert(`Comment on post ${post.id}`)}
            onShare={() => alert(`Share post ${post.id}`)}
          />
        ))}
      </View>
    </View>
  );
}
