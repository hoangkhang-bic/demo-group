import React, { useEffect, useRef, useState } from "react";
import "./page.transition.vertical.css";

interface PageTransitionProps {
  children: React.ReactNode;
  direction?: "from-bottom" | "from-top";
  duration?: number;
  delay?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onTransitionEnd?: () => void;
}

const PageTransitionVertical: React.FC<PageTransitionProps> = ({
  children,
  direction = "from-bottom",
  duration = 400,
  delay = 0,
  disabled = false,
  className = "",
  style = {},
  onTransitionEnd,
}) => {
  const [isVisible, setIsVisible] = useState(disabled);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent body scrolling during transition
    document.body.style.overflowY = "hidden";

    const timer = setTimeout(() => {
      setIsVisible(true);

      // Re-enable body scrolling after transition completes
      const transitionEndTimer = setTimeout(() => {
        document.body.style.overflowY = "";
        if (onTransitionEnd) onTransitionEnd();
      }, duration);

      return () => clearTimeout(transitionEndTimer);
    }, delay);

    return () => {
      clearTimeout(timer);
      document.body.style.overflowY = "";
    };
  }, [delay, duration, onTransitionEnd]);

  const transitionStyle: React.CSSProperties = {
    transition: disabled
      ? "none"
      : `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`,
    ...style,
  };

  const classNames = [
    "page-vertical-transition",
    direction,
    isVisible ? "visible" : "",
    disabled ? "no-transition" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={elementRef} className={classNames} style={transitionStyle}>
      {children}
    </div>
  );
};

export default PageTransitionVertical;
