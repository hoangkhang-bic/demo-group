import React, { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import "./page.android.transition.css";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  disableTransition?: boolean;
  disableTouchFeedback?: boolean;
  style?: React.CSSProperties;
  allowPageScroll?: boolean;
}

interface GestureEvent {
  deltaX: number;
  velocityX: number;
}

const PageAndroidTransition = React.memo(function PageAndroidTransition({
  children,
  className = "",
  style,
  disableTransition = false,
  disableTouchFeedback = true,
  allowPageScroll = false,
}: PageTransitionProps) {
  const location = useLocation();
  const pageRef = useRef<HTMLDivElement>(null);
  const previousPathRef = useRef<string>(location.pathname);
  const isForwardRef = useRef<boolean>(true);
  const gestureRef = useRef<{
    startX: number;
    startY: number;
    startTime: number;
    active: boolean;
    isHorizontalSwipe: boolean | null;
  }>({
    startX: 0,
    startY: 0,
    startTime: 0,
    active: false,
    isHorizontalSwipe: null,
  });

  // Memoize touch handlers to prevent unnecessary re-creations
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!pageRef.current) return;

    gestureRef.current = {
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      startTime: Date.now(),
      active: true,
      isHorizontalSwipe: null,
    };

    pageRef.current.style.transition = "none";
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!pageRef.current || !gestureRef.current.active) return;

    const deltaX = e.touches[0].clientX - gestureRef.current.startX;
    const deltaY = e.touches[0].clientY - gestureRef.current.startY;

    // Determine swipe direction if not already determined
    if (gestureRef.current.isHorizontalSwipe === null) {
      // If horizontal movement is greater than vertical, it's a horizontal swipe
      gestureRef.current.isHorizontalSwipe =
        Math.abs(deltaX) > Math.abs(deltaY);
    }

    // Only handle horizontal swipes for back navigation
    if (gestureRef.current.isHorizontalSwipe) {
      if (deltaX > 0) {
        // Only allow right swipe
        const translateX = Math.min(deltaX, window.innerWidth);
        // Use hardware-accelerated transform
        pageRef.current.style.transform = `translateX(${translateX}px)`;

        // Prevent default to stop page scrolling during swipe
        e.preventDefault();
      }
    }
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!pageRef.current || !gestureRef.current.active) return;

    // Only handle if it was a horizontal swipe
    if (gestureRef.current.isHorizontalSwipe) {
      const endX = e.changedTouches[0].clientX;
      const deltaX = endX - gestureRef.current.startX;
      const deltaTime = Date.now() - gestureRef.current.startTime;
      const velocityX = deltaX / deltaTime; // pixels per ms

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
    }

    gestureRef.current.active = false;
  }, []);

  // Setup gesture handling
  useEffect(() => {
    // Skip gesture setup if transitions are disabled
    if (disableTransition || !pageRef.current) return;

    // Determine if we're going forward or backward
    const currentPath = location.pathname;
    const previousPath = previousPathRef.current;
    isForwardRef.current = currentPath.length > previousPath.length;
    previousPathRef.current = currentPath;

    // Reset transform only (no opacity changes)
    if (pageRef.current) {
      pageRef.current.style.transform = "";
    }

    const element = pageRef.current;
    if (!element) return;

    // Use passive listeners where possible for better scroll performance
    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleTouchEnd);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    location.pathname,
    disableTransition,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  ]);

  // Handle page transitions
  useEffect(() => {
    // Skip transition animation if disabled
    if (disableTransition || !pageRef.current) return;

    const isForward = isForwardRef.current;
    const startTransform = isForward ? "translateX(100%)" : "translateX(-100%)";
    const endTransform = "translateX(0)";

    // Set initial position (transform only)
    pageRef.current.style.transform = startTransform;

    // Use requestAnimationFrame for smoother animations
    const animationFrame = requestAnimationFrame(() => {
      if (!pageRef.current) return;
      pageRef.current.style.transition =
        "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
      pageRef.current.style.transform = endTransform;
    });

    // Cleanup transition
    return () => {
      cancelAnimationFrame(animationFrame);
      if (!pageRef.current) return;
      pageRef.current.style.transition = "";
      pageRef.current.style.transform = "";
    };
  }, [location.pathname, disableTransition]);

  // Prepare optimized inline styles
  const combinedStyles = {
    ...style,
    willChange: disableTransition ? undefined : "transform",
  };

  return (
    <div
      ref={pageRef}
      className={`
        page-transition 
        ${disableTransition ? "page-transition--no-animation" : ""} 
        ${disableTouchFeedback ? "page-transition--no-touch-feedback" : ""}
        ${allowPageScroll ? "" : "page-transition--no-scroll"}
        ${className}
      `}
      style={combinedStyles}
    >
      {children}
    </div>
  );
});

export default PageAndroidTransition;
