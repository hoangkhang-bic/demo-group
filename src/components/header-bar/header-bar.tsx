import React from "react";
import View from "../View/View";
import { useMediaQuery } from "react-responsive";
import "./header-bar.css";
import { useIsDesktop, useIsMobile, useIsTablet } from "@/hooks/useMediaQuery";

interface HeaderBarProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  // Platform specific props
  androidElevation?: number;
  iosShadow?: boolean;
  // Custom shadow props
  shadowColor?: string;
  shadowOffset?: number;
  shadowBlur?: number;
  shadowOpacity?: number;
  showShadow?: boolean;
  // Content props
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
}

export default function HeaderBar({
  children,
  className = "",
  style,
  androidElevation,
  iosShadow = true,
  shadowColor = "rgba(0, 0, 0, 0.08)",
  shadowOffset = 0,
  shadowBlur = 8,
  shadowOpacity = 1,
  showShadow = true,
  contentClassName = "",
  contentStyle,
}: HeaderBarProps) {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();
  const isAndroid = useMediaQuery({ query: "(platform: android)" });
  const isIOS = useMediaQuery({ query: "(platform: ios)" });

  // Platform-specific styles
  const platformStyles: React.CSSProperties = {
    ...(isAndroid && androidElevation
      ? {
          boxShadow: `0 ${androidElevation}px ${
            androidElevation * 2
          }px rgba(0, 0, 0, 0.08)`,
        }
      : {}),
    ...(isIOS && iosShadow
      ? {
          boxShadow: "0 1px 6px rgba(0, 0, 0, 0.08)",
        }
      : {}),
  };

  // Custom shadow styles
  const customShadow: React.CSSProperties = showShadow
    ? {
        boxShadow: `0 ${shadowOffset}px ${shadowBlur}px ${shadowColor}`,
        opacity: shadowOpacity,
      }
    : {};

  return (
    <header
      className={`header-bar ${className}`}
      style={{ ...style, ...platformStyles, ...customShadow }}
    >
      <div
        className={`header-bar__toolbar ${contentClassName}`}
        style={contentStyle}
      >
        {children}
      </div>
    </header>
  );
}
