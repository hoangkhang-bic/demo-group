import React, { ReactNode, useState, useEffect } from "react";
import "./page.transition.vertical.css";

interface PageVerticalTransitionProps {
  children: ReactNode;
  direction?: "up" | "down";
  duration?: number;
  disableTransition?: boolean;
  onTransitionEnd?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const PageVerticalTransition: React.FC<PageVerticalTransitionProps> = ({
  children,
  direction = "up",
  duration = 300,
  disableTransition = false,
  onTransitionEnd,
  className = "",
  style = {},
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    // Skip animation on first render if disableTransition is true
    if (isFirstRender) {
      setIsFirstRender(false);
      if (disableTransition) {
        setIsVisible(true);
        return;
      }
    }

    // Start animation after a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => clearTimeout(timer);
  }, [disableTransition, isFirstRender]);

  const handleTransitionEnd = () => {
    if (onTransitionEnd && isVisible) {
      onTransitionEnd();
    }
  };

  const transitionStyle: React.CSSProperties = disableTransition
    ? {}
    : {
        transition: `transform ${duration}ms cubic-bezier(0.33, 1, 0.68, 1), opacity ${duration}ms cubic-bezier(0.33, 1, 0.68, 1)`,
      };

  const combinedClassName = `page-vertical-transition ${
    direction === "up" ? "from-bottom" : "from-top"
  } ${isVisible ? "visible" : ""} ${
    disableTransition ? "no-transition" : ""
  } ${className}`.trim();

  const combinedStyle = {
    ...transitionStyle,
    ...style,
  };

  return (
    <div
      className={combinedClassName}
      style={combinedStyle}
      onTransitionEnd={handleTransitionEnd}
    >
      {children}
    </div>
  );
};

export default PageVerticalTransition;

