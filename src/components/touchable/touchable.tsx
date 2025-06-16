import React, { useState, useRef, useEffect, ReactNode } from "react";
import "./touchable.css";

interface TouchableProps {
  children: ReactNode;
  onPress?: () => void;
  activeOpacity?: number;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
  delayPressIn?: number;
  delayPressOut?: number;
  testID?: string;
  accessibilityLabel?: string;
  role?: string;
  wrapperStyle?: React.CSSProperties;
  fullWidth?: boolean;
  allowChildEvents?: boolean;
  padding?: number | string;
}

export const Touchable: React.FC<TouchableProps> = ({
  children,
  onPress,
  activeOpacity = 0.7,
  style = {},
  className = "",
  disabled = false,
  delayPressIn = 0,
  delayPressOut = 150,
  testID,
  accessibilityLabel,
  role = "button",
  wrapperStyle = {},
  fullWidth = false,
  allowChildEvents = false,
  padding = 0,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPressingRef = useRef(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Clean up any pending timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handlePressIn = () => {
    if (disabled) return;

    isPressingRef.current = true;

    if (delayPressIn > 0) {
      timeoutRef.current = setTimeout(() => {
        if (isPressingRef.current) {
          setIsPressed(true);
        }
      }, delayPressIn);
    } else {
      setIsPressed(true);
    }
  };

  const handlePressOut = () => {
    if (disabled) return;

    isPressingRef.current = false;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (delayPressOut > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsPressed(false);
      }, delayPressOut);
    } else {
      setIsPressed(false);
    }
  };

  const handlePress = () => {
    if (disabled || !onPress) return;
    onPress();
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (allowChildEvents && e.target !== e.currentTarget) {
      return;
    }

    if (!allowChildEvents) {
      e.stopPropagation();
    }

    handlePressIn();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (allowChildEvents && e.target !== e.currentTarget) {
      return;
    }

    if (!allowChildEvents) {
      e.stopPropagation();
    }

    handlePressOut();

    // Only trigger onPress if the touch ended on the element
    if (elementRef.current && isPressingRef.current) {
      const touch = e.changedTouches[0];
      const rect = elementRef.current.getBoundingClientRect();

      if (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        handlePress();
      }
    }
  };

  const handleTouchCancel = () => {
    handlePressOut();
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only handle left mouse button
    if (e.button !== 0) return;

    if (allowChildEvents && e.target !== e.currentTarget) {
      return;
    }

    if (!allowChildEvents) {
      e.stopPropagation();
    }

    handlePressIn();
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    // Only handle left mouse button
    if (e.button !== 0) return;

    if (allowChildEvents && e.target !== e.currentTarget) {
      return;
    }

    if (!allowChildEvents) {
      e.stopPropagation();
    }

    handlePressOut();
    handlePress();
  };

  const handleMouseLeave = () => {
    handlePressOut();
  };

  // Keyboard event handler for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handlePressIn();
      handlePress();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handlePressOut();
    }
  };

  const touchableStyle: React.CSSProperties = {
    ...style,
    opacity: isPressed ? activeOpacity : 1,
    transition: `opacity ${delayPressOut}ms ease`,
    cursor: disabled ? "default" : "pointer",
    width: fullWidth ? "100%" : "auto",
    display: "inline-flex",
    padding: padding,
  };

  const combinedWrapperStyle: React.CSSProperties = {
    ...wrapperStyle,
    display: "inline-block",
    width: fullWidth ? "100%" : "auto",
  };

  const childrenContainerStyle: React.CSSProperties = {
    pointerEvents: allowChildEvents ? "auto" : "none",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div
      style={combinedWrapperStyle}
      className={`touchable-wrapper ${
        fullWidth ? "touchable-wrapper--full-width" : ""
      }`}
    >
      <div
        ref={elementRef}
        role={role}
        aria-disabled={disabled}
        aria-label={accessibilityLabel}
        data-testid={testID}
        className={`touchable touchable--content-sized ${
          disabled ? "touchable-disabled" : ""
        } ${
          allowChildEvents ? "touchable--allow-child-events" : ""
        } ${className}`}
        style={touchableStyle}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        tabIndex={disabled ? -1 : 0}
      >
        <div
          className="touchable__children-container"
          style={childrenContainerStyle}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
