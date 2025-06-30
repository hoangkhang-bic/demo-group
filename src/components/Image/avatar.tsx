import React, { useState } from "react";
import Image from "./Image";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl"; // 24, 32, 40, 56, 72
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
  onError?: () => void;
  status?: AvatarStatus;
  ariaLabel?: string;
}

const sizeMap: Record<AvatarSize, { dimension: number; textSize: string }> = {
  xs: { dimension: 24, textSize: "text-xs" },
  sm: { dimension: 32, textSize: "text-sm" },
  md: { dimension: 40, textSize: "text-base" },
  lg: { dimension: 56, textSize: "text-lg" },
  xl: { dimension: 72, textSize: "text-xl" },
};

const statusColorMap: Record<AvatarStatus, string> = {
  online: "bg-success",
  busy: "bg-error",
  away: "bg-warning",
  offline: "bg-gray-600",
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
  onError,
  status,
  ariaLabel,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { dimension } = sizeMap[size];

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  const baseClasses = [
    "relative inline-flex items-center justify-center overflow-hidden",
    "transition-transform duration-200 ease-in-out",
    onClick ? "cursor-pointer hover:scale-105 hover:shadow-lg" : "",
    variant === "circle" ? "rounded-full" : "rounded-lg",
    isLoading ? "animate-pulse bg-gray-100" : "",
    hasError ? "bg-error/10 border border-error/20" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={baseClasses}
      style={{
        ...style,
        width: dimension,
        height: dimension,
      }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel || alt}
      onKeyPress={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {!hasError ? (
        <Image
          source={source}
          width={dimension}
          height={dimension}
          lazyLoad={lazyLoad}
          className={`w-full h-full object-cover ${
            variant === "circle" ? "rounded-full" : "rounded-lg"
          } border border-gray-100`}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-error">
          <svg
            className="w-1/2 h-1/2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
              fill="currentColor"
            />
          </svg>
        </div>
      )}
      {status && (
        <span
          className={`absolute bottom-0.5 right-0.5 rounded-full border-2 border-white shadow-sm ${statusColorMap[status]}`}
          style={{
            width: Math.max(8, dimension * 0.25),
            height: Math.max(8, dimension * 0.25),
            maxWidth: 12,
            maxHeight: 12,
          }}
        />
      )}
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
  ariaLabel,
}) => {
  const { dimension, textSize } = sizeMap[size];

  const baseClasses = [
    "relative inline-flex items-center justify-center overflow-hidden",
    "transition-transform duration-200 ease-in-out bg-gray-100 text-gray-600",
    onClick ? "cursor-pointer hover:scale-105 hover:shadow-lg" : "",
    variant === "circle" ? "rounded-full" : "rounded-lg",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={baseClasses}
      style={{
        ...style,
        width: dimension,
        height: dimension,
      }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel || "Avatar placeholder"}
      onKeyPress={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <svg
        className="w-1/2 h-1/2"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
          fill="currentColor"
        />
      </svg>
      {status && (
        <span
          className={`absolute bottom-0.5 right-0.5 rounded-full border-2 border-white shadow-sm ${statusColorMap[status]}`}
          style={{
            width: Math.max(8, dimension * 0.25),
            height: Math.max(8, dimension * 0.25),
            maxWidth: 12,
            maxHeight: 12,
          }}
        />
      )}
    </div>
  );
};

// Avatar Group component
interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max,
  className = "",
  style = {},
  ariaLabel,
}) => {
  const childrenArray = React.Children.toArray(children);
  const totalAvatars = childrenArray.length;
  const displayedAvatars = max ? childrenArray.slice(0, max) : childrenArray;
  const remainingCount = max && totalAvatars > max ? totalAvatars - max : 0;

  return (
    <div
      className={`flex flex-row p-1 ${className}`}
      style={style}
      role="group"
      aria-label={ariaLabel || `Group of ${totalAvatars} avatars`}
    >
      {displayedAvatars.map((avatar, index) => (
        <div
          key={index}
          className={`${
            index !== 0 ? "-ml-2" : ""
          } transition-all duration-200 ease-in-out border-2 border-white shadow-sm hover:ml-0 first:ml-0`}
        >
          {avatar}
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className="relative -ml-2 inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-600 border-2 border-white shadow-sm text-sm font-semibold transition-all duration-200 ease-in-out hover:ml-0"
          style={{
            width: sizeMap.md.dimension,
            height: sizeMap.md.dimension,
          }}
          aria-label={`${remainingCount} more avatars`}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default Avatar;
