import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./page.android.transition.css";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  disableTransition?: boolean;
  disableTouchFeedback?: boolean;
  style?: React.CSSProperties;
}

interface GestureEvent {
  deltaX: number;
  velocityX: number;
}

export default function PageAndroidTransition({
  children,
  className = "",
  style,
  disableTransition = false,
  disableTouchFeedback = true,
}: PageTransitionProps) {
  const location = useLocation();
  const pageRef = useRef<HTMLDivElement>(null);
  const previousPathRef = useRef<string>(location.pathname);
  const isForwardRef = useRef<boolean>(true);
  const gestureRef = useRef<{
    startX: number;
    startTime: number;
    active: boolean;
  }>({ startX: 0, startTime: 0, active: false });

  useEffect(() => {
    // Skip gesture setup if transitions are disabled
    if (disableTransition || !pageRef.current) return;

    // Determine if we're going forward or backward
    const currentPath = location.pathname;
    const previousPath = previousPathRef.current;
    isForwardRef.current = currentPath.length > previousPath.length;
    previousPathRef.current = currentPath;

    // Reset transform only (no opacity changes)
    pageRef.current.style.transform = "";

    // Custom gesture implementation
    const handleTouchStart = (e: TouchEvent) => {
      if (!pageRef.current) return;

      gestureRef.current = {
        startX: e.touches[0].clientX,
        startTime: Date.now(),
        active: true,
      };

      pageRef.current.style.transition = "none";
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!pageRef.current || !gestureRef.current.active) return;

      const deltaX = e.touches[0].clientX - gestureRef.current.startX;

      if (deltaX > 0) {
        // Only allow right swipe
        const translateX = Math.min(deltaX, window.innerWidth);
        // Remove opacity changes
        pageRef.current.style.transform = `translateX(${translateX}px)`;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!pageRef.current || !gestureRef.current.active) return;

      const endX = e.changedTouches[0].clientX;
      const deltaX = endX - gestureRef.current.startX;
      const deltaTime = Date.now() - gestureRef.current.startTime;
      const velocityX = deltaX / deltaTime; // pixels per ms

      gestureRef.current.active = false;

      // Reset transition (transform only)
      pageRef.current.style.transition =
        "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

      // If swiped more than 1/3 of screen width or with high velocity, trigger back
      if (deltaX > window.innerWidth / 3 || velocityX > 0.5) {
        pageRef.current.style.transform = `translateX(${window.innerWidth}px)`;
        // Wait for animation to complete before going back
        setTimeout(() => {
          window.history.back();
        }, 300);
      } else {
        // Reset position
        pageRef.current.style.transform = "";
      }
    };

    const element = pageRef.current;
    element.addEventListener("touchstart", handleTouchStart);
    element.addEventListener("touchmove", handleTouchMove);
    element.addEventListener("touchend", handleTouchEnd);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [location.pathname, disableTransition]);

  // Handle page transitions
  useEffect(() => {
    // Skip transition animation if disabled
    if (disableTransition || !pageRef.current) return;

    const isForward = isForwardRef.current;
    const startTransform = isForward ? "translateX(100%)" : "translateX(-100%)";
    const endTransform = "translateX(0)";

    // Set initial position (transform only)
    pageRef.current.style.transform = startTransform;

    // Trigger transition
    requestAnimationFrame(() => {
      if (!pageRef.current) return;
      pageRef.current.style.transition =
        "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
      pageRef.current.style.transform = endTransform;
    });

    // Cleanup transition
    return () => {
      if (!pageRef.current) return;
      pageRef.current.style.transition = "";
      pageRef.current.style.transform = "";
    };
  }, [location.pathname, disableTransition]);

  return (
    <div
      ref={pageRef}
      className={`
        page-transition 
        ${disableTransition ? "page-transition--no-animation" : ""} 
        ${disableTouchFeedback ? "page-transition--no-touch-feedback" : ""}
        ${className}
      `}
      style={style}
    >
      {children}
    </div>
  );
}
