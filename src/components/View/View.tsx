import React from "react";
import "./View.css";

interface ViewProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  // Layout props
  flex?: number | boolean;
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  // Spacing props
  padding?: number | string;
  paddingHorizontal?: number | string;
  paddingVertical?: number | string;
  margin?: number | string;
  marginHorizontal?: number | string;
  marginVertical?: number | string;
  // Color props
  backgroundColor?: string;
  // Size props
  width?: number | string;
  height?: number | string;
  // Border props
  borderRadius?: number | string;
  borderWidth?: number;
  borderColor?: string;
  // Position props
  position?: "absolute" | "relative" | "fixed" | "sticky";
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  zIndex?: number;
  // Other props
  safeArea?: boolean;
  center?: boolean;
  gap?: number | string;
  // Width behavior props
  fitContent?: boolean;
  inline?: boolean;
  // Flex specific props
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string | number;
  // Shadow props
  elevation?: number;
  // Opacity
  opacity?: number;
  // Overflow
  overflow?: "visible" | "hidden" | "scroll" | "auto";
  // Transform
  transform?: string;
  // Animation
  transition?: string;
  // Variants
  variant?: "primary" | "secondary" | "light" | "dark";
}

export default function View({
  children,
  style,
  className = "",
  flex,
  flexDirection,
  justifyContent,
  alignItems,
  padding,
  paddingHorizontal,
  paddingVertical,
  margin,
  marginHorizontal,
  marginVertical,
  backgroundColor,
  width,
  height,
  borderRadius,
  borderWidth,
  borderColor,
  position,
  top,
  left,
  right,
  bottom,
  zIndex,
  safeArea,
  center,
  gap,
  fitContent = false,
  inline = false,
  flexWrap,
  flexGrow,
  flexShrink,
  flexBasis,
  elevation,
  opacity,
  overflow,
  transform,
  transition,
  variant,
  ...otherProps
}: ViewProps) {
  // Build dynamic styles based on props
  const dynamicStyles: React.CSSProperties = {
    // Display and flex
    display: "flex", // Always use flex display
    ...(flex !== undefined
      ? {
          flex: typeof flex === "boolean" ? 1 : flex,
        }
      : {
          width: width ?? "fit-content",
          height: height ?? "fit-content",
          minWidth: "min-content",
          minHeight: "min-content",
        }),
    ...(flexDirection ? { flexDirection } : {}),
    ...(justifyContent ? { justifyContent } : {}),
    ...(alignItems ? { alignItems } : {}),
    ...(inline ? { display: "inline-flex" } : {}),

    // Spacing
    ...(padding !== undefined ? { padding } : {}),
    ...(paddingHorizontal !== undefined
      ? { paddingLeft: paddingHorizontal, paddingRight: paddingHorizontal }
      : {}),
    ...(paddingVertical !== undefined
      ? { paddingTop: paddingVertical, paddingBottom: paddingVertical }
      : {}),
    ...(margin !== undefined ? { margin } : {}),
    ...(marginHorizontal !== undefined
      ? { marginLeft: marginHorizontal, marginRight: marginHorizontal }
      : {}),
    ...(marginVertical !== undefined
      ? { marginTop: marginVertical, marginBottom: marginVertical }
      : {}),

    // Colors and borders
    ...(backgroundColor ? { backgroundColor } : {}),
    ...(borderWidth !== undefined
      ? {
          borderWidth: `${borderWidth}px`,
          borderStyle: "solid",
          borderColor: borderColor ?? "currentColor",
        }
      : {}),
    ...(borderColor && !borderWidth
      ? {
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor,
        }
      : {}),
    ...(borderRadius !== undefined ? { borderRadius } : {}),

    // Dimensions - only apply if explicitly set
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),

    // Position
    ...(position ? { position } : {}),
    ...(top !== undefined ? { top } : {}),
    ...(left !== undefined ? { left } : {}),
    ...(right !== undefined ? { right } : {}),
    ...(bottom !== undefined ? { bottom } : {}),
    ...(zIndex !== undefined ? { zIndex } : {}),

    // Flex specific
    ...(flexWrap ? { flexWrap } : {}),
    ...(flexGrow !== undefined ? { flexGrow } : {}),
    ...(flexShrink !== undefined ? { flexShrink } : {}),
    ...(flexBasis !== undefined ? { flexBasis } : {}),

    // Gap
    ...(gap !== undefined
      ? {
          gap: typeof gap === "number" ? `${gap}px` : gap,
        }
      : {}),

    // Fit content
    ...(fitContent
      ? {
          width: "fit-content",
          height: "fit-content",
          minWidth: "min-content",
          minHeight: "min-content",
          maxWidth: "max-content",
          maxHeight: "max-content",
        }
      : {}),

    // Shadow (elevation)
    ...(elevation !== undefined
      ? {
          boxShadow: `0 ${elevation}px ${elevation * 2}px rgba(0, 0, 0, 0.1)`,
        }
      : {}),

    // Other properties
    ...(opacity !== undefined ? { opacity } : {}),
    ...(overflow ? { overflow } : {}),
    ...(transform ? { transform } : {}),
    ...(transition ? { transition } : {}),

    // Custom styles
    ...style,
  };

  // Build class names based on props
  let classNames = ["rn-view"];

  if (variant) {
    classNames.push(`rn-view--${variant}`);
  }

  if (safeArea) {
    classNames.push("rn-view--safe-area");
  }

  if (center) {
    classNames.push("rn-view--center");
  }

  if (flexDirection === "row") {
    classNames.push("rn-view--row");
  }

  if (className) {
    classNames.push(className);
  }

  return (
    <div className={classNames.join(" ")} style={dynamicStyles} {...otherProps}>
      {children}
    </div>
  );
}
