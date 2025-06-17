import React from "react";
import View from "../View/View";
import Avatar from "../Image/avatar";
import "./facebook-item.css";
import {
  IoHeartOutline,
  IoHeart,
  IoShareSocialOutline,
  IoChatbubbleOutline,
} from "react-icons/io5";

interface FacebookItemProps {
  user: {
    name: string;
    avatar: string;
    timestamp: string;
  };
  content: {
    text?: string;
    images?: string[];
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  liked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const FacebookItem: React.FC<FacebookItemProps> = ({
  user,
  content,
  stats,
  liked = false,
  onLike,
  onComment,
  onShare,
  className = "",
  style = {},
}) => {
  return (
    <View
      className={`facebook-item ${className}`}
      flexDirection="column"
      backgroundColor="#ffffff"
      borderRadius={8}
      elevation={1}
      marginVertical={8}
      style={style}
    >
      {/* Header with user info */}
      <View flexDirection="row" alignItems="center" padding={12} gap={10}>
        <Avatar source={user.avatar} size="md" variant="circle" />
        <View flexDirection="column">
          <h3 className="facebook-item-username">{user.name}</h3>
          <p className="facebook-item-timestamp">{user.timestamp}</p>
        </View>
      </View>

      {/* Content */}
      <View flexDirection="column" padding={12}>
        {content.text && <p className="facebook-item-text">{content.text}</p>}

        {content.images && content.images.length > 0 && (
          <View className="facebook-item-images" margin="8px 0 0 0">
            {content.images.length === 1 ? (
              <img
                src={content.images[0]}
                alt="Post content"
                className="facebook-item-single-image"
              />
            ) : (
              <View
                className="facebook-item-image-grid"
                flexDirection="row"
                flexWrap="wrap"
                gap={4}
              >
                {content.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Post content ${index + 1}`}
                    className="facebook-item-grid-image"
                  />
                ))}
              </View>
            )}
          </View>
        )}
      </View>

      {/* Stats */}
      <View
        flexDirection="row"
        justifyContent="space-between"
        padding={12}
        borderColor="#f0f0f0"
        borderWidth={1}
        borderRadius={0}
      >
        <View flexDirection="row" alignItems="center" gap={4}>
          <IoHeart className="facebook-item-stat-icon facebook-item-like-icon" />
          <span className="facebook-item-stat-text">{stats.likes}</span>
        </View>
        <View flexDirection="row" gap={8}>
          <span className="facebook-item-stat-text">
            {stats.comments} comments
          </span>
          <span className="facebook-item-stat-text">{stats.shares} shares</span>
        </View>
      </View>

      {/* Action buttons */}
      <View flexDirection="row" justifyContent="space-between" padding={8}>
        <View
          className="facebook-item-action"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flex={1}
          padding={8}
          gap={4}
        >
          <div className="facebook-item-action-wrapper" onClick={onLike}>
            {liked ? (
              <IoHeart className="facebook-item-action-icon facebook-item-liked" />
            ) : (
              <IoHeartOutline className="facebook-item-action-icon" />
            )}
            <span
              className={`facebook-item-action-text ${
                liked ? "facebook-item-liked" : ""
              }`}
            >
              Like
            </span>
          </div>
        </View>

        <View
          className="facebook-item-action"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flex={1}
          padding={8}
          gap={4}
        >
          <div className="facebook-item-action-wrapper" onClick={onComment}>
            <IoChatbubbleOutline className="facebook-item-action-icon" />
            <span className="facebook-item-action-text">Comment</span>
          </div>
        </View>

        <View
          className="facebook-item-action"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flex={1}
          padding={8}
          gap={4}
        >
          <div className="facebook-item-action-wrapper" onClick={onShare}>
            <IoShareSocialOutline className="facebook-item-action-icon" />
            <span className="facebook-item-action-text">Share</span>
          </div>
        </View>
      </View>
    </View>
  );
};

export default FacebookItem;
