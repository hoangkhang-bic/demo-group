import React from "react";
import Image from "./Image";
import "./avatar.css";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
type AvatarVariant = "circle" | "square";
type AvatarStatus = "online" | "busy" | "away" | "offline";

interface AvatarProps {
  source: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  alt?: string;
  lazyLoad?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  status?: AvatarStatus;
}

const sizeMap: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 72,
};

const Avatar: React.FC<AvatarProps> = ({
  source,
  size = "md",
  variant = "circle",
  alt = "Avatar",
  lazyLoad = true,
  className = "",
  style = {},
  onClick,
  status,
}) => {
  const dimension = sizeMap[size];
  const borderRadius = variant === "circle" ? "50%" : "8px";

  return (
    <div
      className={`avatar avatar--${size} avatar--${variant} ${className}`}
      style={{
        width: dimension,
        height: dimension,
        ...style,
      }}
      onClick={onClick}
    >
      <Image
        source={source}
        width={dimension}
        height={dimension}
        lazyLoad={lazyLoad}
        style={{
          border: "1px solid #e0e0e0",
          borderRadius,
          objectFit: "cover",
        }}
        alt={alt}
      />
      {status && <span className={`avatar-status avatar-status--${status}`} />}
    </div>
  );
};

// Placeholder component when no image is available
export const AvatarPlaceholder: React.FC<Omit<AvatarProps, "source">> = ({
  size = "md",
  variant = "circle",
  className = "",
  style = {},
  onClick,
  status,
}) => {
  const dimension = sizeMap[size];
  const borderRadius = variant === "circle" ? "50%" : "8px";

  return (
    <div
      className={`avatar-placeholder avatar--${size} avatar--${variant} ${className}`}
      style={{
        width: dimension,
        height: dimension,
        backgroundColor: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius,
        border: "1px solid #e0e0e0",
        color: "#999",
        ...style,
      }}
      onClick={onClick}
    >
      <svg
        width={dimension * 0.5}
        height={dimension * 0.5}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
          fill="currentColor"
        />
      </svg>
      {status && <span className={`avatar-status avatar-status--${status}`} />}
    </div>
  );
};

// Avatar Group component
interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max,
  className = "",
  style = {},
}) => {
  const childrenArray = React.Children.toArray(children);
  const totalAvatars = childrenArray.length;
  const displayedAvatars = max ? childrenArray.slice(0, max) : childrenArray;
  const remainingCount = max && totalAvatars > max ? totalAvatars - max : 0;

  return (
    <div className={`avatar-group ${className}`} style={style}>
      {displayedAvatars}
      {remainingCount > 0 && (
        <div
          className="avatar-placeholder avatar--md avatar--circle"
          style={{
            backgroundColor: "#e0e0e0",
            color: "#666",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default Avatar;
