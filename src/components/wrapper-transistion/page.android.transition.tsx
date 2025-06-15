import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { createGesture } from "@ionic/core";
import "./page.android.transition.css";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function PageAndroidTransition({
  children,
  className = "",
  style,
}: PageTransitionProps) {
  const location = useLocation();
  const pageRef = useRef<HTMLDivElement>(null);
  const previousPathRef = useRef<string>(location.pathname);
  const isForwardRef = useRef<boolean>(true);

  useEffect(() => {
    if (!pageRef.current) return;

    // Determine if we're going forward or backward
    const currentPath = location.pathname;
    const previousPath = previousPathRef.current;
    isForwardRef.current = currentPath.length > previousPath.length;
    previousPathRef.current = currentPath;

    // Reset transform and opacity
    pageRef.current.style.transform = "";
    pageRef.current.style.opacity = "1";

    // Create gesture for swipe back
    const gesture = createGesture({
      el: pageRef.current,
      threshold: 0,
      gestureName: "page-transition",
      onStart: () => {
        if (!pageRef.current) return;
        pageRef.current.style.transition = "none";
      },
      onMove: (ev) => {
        if (!pageRef.current) return;
        const deltaX = ev.deltaX;
        if (deltaX > 0) {
          // Only allow right swipe
          const translateX = Math.min(deltaX, window.innerWidth);
          const opacity = 1 - (translateX / window.innerWidth) * 0.3;
          pageRef.current.style.transform = `translateX(${translateX}px)`;
          pageRef.current.style.opacity = opacity.toString();
        }
      },
      onEnd: (ev) => {
        if (!pageRef.current) return;
        const deltaX = ev.deltaX;
        const velocity = ev.velocityX;

        // Reset transition
        pageRef.current.style.transition =
          "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

        // If swiped more than 1/3 of screen width or with high velocity, trigger back
        if (deltaX > window.innerWidth / 3 || velocity > 0.5) {
          pageRef.current.style.transform = `translateX(${window.innerWidth}px)`;
          pageRef.current.style.opacity = "0";
          // Wait for animation to complete before going back
          setTimeout(() => {
            window.history.back();
          }, 300);
        } else {
          // Reset position
          pageRef.current.style.transform = "";
          pageRef.current.style.opacity = "1";
        }
      },
    });

    gesture.enable();

    return () => {
      gesture.destroy();
    };
  }, [location.pathname]);

  // Handle page transitions
  useEffect(() => {
    if (!pageRef.current) return;

    const isForward = isForwardRef.current;
    const startTransform = isForward ? "translateX(100%)" : "translateX(-100%)";
    const endTransform = "translateX(0)";

    // Set initial position
    pageRef.current.style.transform = startTransform;
    pageRef.current.style.opacity = "0";

    // Trigger transition
    requestAnimationFrame(() => {
      if (!pageRef.current) return;
      pageRef.current.style.transition =
        "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
      pageRef.current.style.transform = endTransform;
      pageRef.current.style.opacity = "1";
    });

    // Cleanup transition
    return () => {
      if (!pageRef.current) return;
      pageRef.current.style.transition = "";
      pageRef.current.style.transform = "";
      pageRef.current.style.opacity = "";
    };
  }, [location.pathname]);

  return (
    <div ref={pageRef} className={`page-transition ${className}`} style={style}>
      {children}
    </div>
  );
}
