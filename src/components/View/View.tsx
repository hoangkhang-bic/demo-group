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
  // Variants
  variant?: "primary" | "secondary" | "light" | "dark";
  // Other props
  safeArea?: boolean;
  center?: boolean;
  gap?: number | string;
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
  variant,
  safeArea,
  center,
  gap,
  ...otherProps
}: ViewProps) {
  // Build dynamic styles based on props
  const dynamicStyles: React.CSSProperties = {
    ...(flex === true ? { flex: 1 } : flex ? { flex } : {}),
    ...(flexDirection ? { flexDirection } : {}),
    ...(justifyContent ? { justifyContent } : {}),
    ...(alignItems ? { alignItems } : {}),
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
    ...(backgroundColor ? { backgroundColor } : {}),
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
    ...(borderRadius !== undefined ? { borderRadius } : {}),
    ...(gap !== undefined
      ? { gap: typeof gap === "number" ? `${gap}px` : gap }
      : {}),
    ...style,
  };

  // Build class names based on props
  let classNames = ["container-view"];

  if (variant) {
    classNames.push(`container-view--${variant}`);
  }

  if (safeArea) {
    classNames.push("container-view--safe-area");
  }

  if (center) {
    classNames.push("container-view--center");
  }

  if (flexDirection === "row") {
    classNames.push("container-view--row");
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
