import React, { ReactNode, useEffect, useState } from "react";
import "./seft-area-view.css";
import {
  isIOS,
  isAndroid,
  getSafeAreaInsets,
  getPlatform,
} from "@/utils/platform";

interface SafeAreaViewProps {
  children: ReactNode;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  style?: React.CSSProperties;
  className?: string;
  forceInset?: {
    top?: "always" | "never" | number;
    bottom?: "always" | "never" | number;
    left?: "always" | "never" | number;
    right?: "always" | "never" | number;
  };
}

export default function SafeAreaView({
  children,
  top = true,
  bottom = true,
  left = true,
  right = true,
  style = {},
  className = "",
  forceInset,
}: SafeAreaViewProps) {
  const [insets, setInsets] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });
  const [platform, setPlatform] = useState<"ios" | "android" | "web">("web");

  useEffect(() => {
    // Get the current platform
    setPlatform(getPlatform());

    // Get safe area insets
    const safeAreaInsets = getSafeAreaInsets();
    setInsets(safeAreaInsets);

    // Listen for orientation changes
    const handleOrientationChange = () => {
      setTimeout(() => {
        setInsets(getSafeAreaInsets());
      }, 100);
    };

    window.addEventListener("orientationchange", handleOrientationChange);
    window.addEventListener("resize", handleOrientationChange);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  // Calculate padding based on insets and props
  const calculatePadding = (
    side: "top" | "bottom" | "left" | "right"
  ): string | number => {
    // If this side is disabled, return 0
    if (
      (side === "top" && !top) ||
      (side === "bottom" && !bottom) ||
      (side === "left" && !left) ||
      (side === "right" && !right)
    ) {
      return 0;
    }

    // If there's a forced inset value
    if (forceInset && forceInset[side] !== undefined) {
      if (forceInset[side] === "always") {
        return (
          insets[side] || (side === "top" ? 20 : side === "bottom" ? 16 : 0)
        );
      } else if (forceInset[side] === "never") {
        return 0;
      } else if (typeof forceInset[side] === "number") {
        return forceInset[side] as number;
      }
    }

    // Use CSS env() variables by default
    return `env(safe-area-inset-${side}, ${insets[side]}px)`;
  };

  const safeAreaStyle: React.CSSProperties = {
    ...style,
    paddingTop: calculatePadding("top"),
    paddingBottom: calculatePadding("bottom"),
    paddingLeft: calculatePadding("left"),
    paddingRight: calculatePadding("right"),
  };

  const safeAreaClasses = [
    "safe-area-view",
    top ? "safe-area-view--top" : "",
    bottom ? "safe-area-view--bottom" : "",
    left ? "safe-area-view--left" : "",
    right ? "safe-area-view--right" : "",
    `safe-area-view--platform-${platform}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={safeAreaClasses}
      style={safeAreaStyle}
      data-platform={platform}
    >
      {children}
    </div>
  );
}
