import React from "react";
import "./View.css";
import {
  useIsMobile,
  useIsTablet,
  useIsDesktop,
} from "../../hooks/useMediaQuery";

type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";
type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";
type AlignItems = "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
type Position = "absolute" | "relative" | "fixed" | "sticky";
type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";
type Overflow = "visible" | "hidden" | "scroll" | "auto";
type Variant = "primary" | "secondary" | "light" | "dark";
type DeviceType = "mobile" | "tablet" | "desktop";

interface ViewProps {
  // Required props
  children: React.ReactNode;

  // Common props
  style?: React.CSSProperties;
  className?: string;
  dataTestId?: string;

  // Layout props
  flex?: number | boolean;
  flexDirection?: FlexDirection;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  flexWrap?: FlexWrap;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string | number;
  gap?: number | string;
  fitContent?: boolean;
  inline?: boolean;
  center?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;

  // Spacing props
  padding?: number | string;
  paddingHorizontal?: number | string;
  paddingVertical?: number | string;
  margin?: number | string;
  marginHorizontal?: number | string;
  marginVertical?: number | string;

  // Dimension props
  width?: number | string;
  height?: number | string;

  // Visual props
  backgroundColor?: string;
  borderRadius?: number | string;
  borderWidth?: number;
  borderColor?: string;
  elevation?: number;
  opacity?: number;
  overflow?: Overflow;
  transform?: string;
  transition?: string;
  variant?: Variant;

  // Position props
  position?: Position;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  zIndex?: number;

  // Special props
  safeArea?: boolean;

  // Responsive props
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
  showOnlyOn?: DeviceType;
  mobileClassName?: string;
  tabletClassName?: string;
  desktopClassName?: string;
}

export default function View({
  // Required props
  children,

  // Common props
  style,
  className = "",
  dataTestId,

  // Layout props
  flex,
  flexDirection,
  justifyContent,
  alignItems,
  flexWrap,
  flexGrow,
  flexShrink,
  flexBasis,
  gap,
  fitContent = false,
  inline = false,
  center,
  fullWidth = false,
  fullHeight = false,

  // Spacing props
  padding,
  paddingHorizontal,
  paddingVertical,
  margin,
  marginHorizontal,
  marginVertical,

  // Dimension props
  width,
  height,

  // Visual props
  backgroundColor,
  borderRadius,
  borderWidth,
  borderColor,
  elevation,
  opacity,
  overflow,
  transform,
  transition,
  variant,

  // Position props
  position,
  top,
  left,
  right,
  bottom,
  zIndex,

  // Special props
  safeArea,

  // Responsive props
  hideOnMobile,
  hideOnTablet,
  hideOnDesktop,
  showOnlyOn,
  mobileClassName,
  tabletClassName,
  desktopClassName,

  ...otherProps
}: ViewProps) {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();

  // Handle responsive visibility
  if (
    (hideOnMobile && isMobile) ||
    (hideOnTablet && isTablet) ||
    (hideOnDesktop && isDesktop) ||
    (showOnlyOn === "mobile" && !isMobile) ||
    (showOnlyOn === "tablet" && !isTablet) ||
    (showOnlyOn === "desktop" && !isDesktop)
  ) {
    return null;
  }

  // Build dynamic styles
  const dynamicStyles: React.CSSProperties = {
    // Layout styles
    display: inline ? "inline-flex" : "flex",
    ...(flex !== undefined && { flex: typeof flex === "boolean" ? 1 : flex }),
    ...(flexDirection && { flexDirection }),
    ...(justifyContent && { justifyContent }),
    ...(alignItems && { alignItems }),
    ...(flexWrap && { flexWrap }),
    ...(flexGrow !== undefined && { flexGrow }),
    ...(flexShrink !== undefined && { flexShrink }),
    ...(flexBasis !== undefined && { flexBasis }),
    ...(gap !== undefined && {
      gap: typeof gap === "number" ? `${gap}px` : gap,
    }),

    // Spacing styles
    ...(padding !== undefined && { padding }),
    ...(paddingHorizontal && {
      paddingLeft: paddingHorizontal,
      paddingRight: paddingHorizontal,
    }),
    ...(paddingVertical && {
      paddingTop: paddingVertical,
      paddingBottom: paddingVertical,
    }),
    ...(margin !== undefined && { margin }),
    ...(marginHorizontal && {
      marginLeft: marginHorizontal,
      marginRight: marginHorizontal,
    }),
    ...(marginVertical && {
      marginTop: marginVertical,
      marginBottom: marginVertical,
    }),

    // Dimension styles
    ...(width !== undefined && { width }),
    ...(height !== undefined && { height }),
    ...(fullWidth && { width: "100vw" }),
    ...(fullHeight && { height: "100vh" }),

    // Visual styles
    ...(backgroundColor && { backgroundColor }),
    ...(borderRadius !== undefined && { borderRadius }),
    ...(borderWidth !== undefined && {
      borderWidth: `${borderWidth}px`,
      borderStyle: "solid",
      borderColor: borderColor ?? "currentColor",
    }),
    ...(borderColor &&
      !borderWidth && {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor,
      }),
    ...(elevation !== undefined && {
      boxShadow: `0 ${elevation}px ${elevation * 2}px rgba(0, 0, 0, 0.2)`,
    }),
    ...(opacity !== undefined && { opacity }),
    ...(overflow && { overflow }),
    ...(transform && { transform }),
    ...(transition && { transition }),

    // Position styles
    ...(position && { position }),
    ...(top !== undefined && { top }),
    ...(left !== undefined && { left }),
    ...(right !== undefined && { right }),
    ...(bottom !== undefined && { bottom }),
    ...(zIndex !== undefined && { zIndex }),

    // Fit content styles
    ...(fitContent && {
      width: "fit-content",
      height: "fit-content",
      minWidth: "min-content",
      minHeight: "min-content",
      maxWidth: "max-content",
      maxHeight: "max-content",
    }),

    // Custom styles
    ...style,
  };

  // Build class names
  const classNames = [
    "rn-view",
    variant && `rn-view--${variant}`,
    safeArea && "rn-view--safe-area",
    center && "rn-view--center",
    flexDirection === "row" && "rn-view--row",
    fullWidth && "rn-view--full-width",
    fullHeight && "rn-view--full-height",
    isMobile && mobileClassName,
    isTablet && tabletClassName,
    isDesktop && desktopClassName,
    className,
  ].filter(Boolean);

  return (
    <div
      className={classNames.join(" ")}
      style={dynamicStyles}
      data-testid={dataTestId}
      {...otherProps}
    >
      {children}
    </div>
  );
}
