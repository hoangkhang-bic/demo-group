import React, { ReactNode } from "react";
import { Touchable } from "../touchable/touchable";
import "./button.css";

interface ButtonProps {
  children: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  activeOpacity?: number;
  delayPressIn?: number;
  delayPressOut?: number;
  testID?: string;
  accessibilityLabel?: string;
  fullWidth?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "outline" | "text";
  padding?: number | string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  disabled = false,
  style = {},
  className = "",
  activeOpacity = 0.7,
  delayPressIn = 0,
  delayPressOut = 150,
  testID,
  accessibilityLabel,
  fullWidth = false,
  size = "medium",
  variant = "primary",
  padding,
}) => {
  // Default padding based on size if not explicitly provided
  const defaultPadding =
    padding !== undefined
      ? padding
      : size === "small"
      ? "6px 12px"
      : size === "medium"
      ? "10px 16px"
      : "12px 20px"; // large

  const buttonClasses = [
    "button",
    `button--${size}`,
    `button--${variant}`,
    disabled ? "button--disabled" : "",
    fullWidth ? "button--full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Touchable
      onPress={onPress}
      disabled={disabled}
      style={style}
      className={buttonClasses}
      activeOpacity={activeOpacity}
      delayPressIn={delayPressIn}
      delayPressOut={delayPressOut}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      role="button"
      fullWidth={fullWidth}
      padding={defaultPadding}
    >
      <div className="button__content">{children}</div>
    </Touchable>
  );
};
