import React from "react";
import { useMediaQuery } from "react-responsive";
import View from "../View/View";
import "./page.css";

interface PageProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  // Layout props
  fullscreen?: boolean;
  safeArea?: boolean;
  // Content props
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
  // Platform specific props
  androidElevation?: number;
  iosShadow?: boolean;
}

export default function Page({
  children,
  className = "",
  style,
  fullscreen = false,
  safeArea = true,
  contentClassName = "",
  contentStyle,
  androidElevation,
  iosShadow = true,
}: PageProps) {
  // Platform detection
  const isAndroid = useMediaQuery({ query: "(platform: android)" });
  const isIOS = useMediaQuery({ query: "(platform: ios)" });
  const isMobile = useMediaQuery({ maxWidth: 576 });
  const isTablet = useMediaQuery({ minWidth: 577, maxWidth: 991 });
  const isDesktop = useMediaQuery({ minWidth: 992 });

  // Platform-specific styles
  const platformStyles: React.CSSProperties = {
    ...(isAndroid && androidElevation
      ? {
          boxShadow: `0 ${androidElevation}px ${
            androidElevation * 2
          }px rgba(0, 0, 0, 0.1)`,
        }
      : {}),
    ...(isIOS && iosShadow
      ? {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }
      : {}),
  };

  // Responsive padding
  const getResponsivePadding = () => {
    if (isMobile) return 16;
    if (isTablet) return 24;
    return 0;
  };

  return (
    <div
      className={`page ${fullscreen ? "page--fullscreen" : ""} ${className}`}
      style={style}
    >
      <div className={`page-content ${contentClassName}`} style={contentStyle}>
        <View
          flex
          flexDirection="column"
          padding={getResponsivePadding()}
          style={platformStyles}
        >
          {children}
        </View>
      </div>
    </div>
  );
}
