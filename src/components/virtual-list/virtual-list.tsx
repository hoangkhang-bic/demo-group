import React, { useEffect, useRef, useState, useCallback } from "react";
import "./virtual-list.css";

interface VirtualListProps<T> {
  items: any[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight?: number;
  overscan?: number;
  className?: string;
  onEndReached?: () => void;
  endReachedThreshold?: number;
  style?: React.CSSProperties;
  height?: number | string;
  width?: number | string;
  scrollEnabled?: boolean;
  showsVerticalScrollIndicator?: boolean;
  keyExtractor?: (item: any) => string;
  columnSpacing?: number;
  autoHeight?: boolean;
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
  onScrollBeginDrag?: () => void;
  onScrollEndDrag?: () => void;
  onMomentumScrollBegin?: () => void;
  onMomentumScrollEnd?: () => void;
}

export default function VirtualList({
  items,
  renderItem,
  itemHeight = 60,
  overscan = 3,
  className = "",
  onEndReached,
  endReachedThreshold = 0.8,
  style,
  height = "100%",
  width = "100%",
  scrollEnabled = true,
  showsVerticalScrollIndicator = true,
  keyExtractor,
  columnSpacing = 0,
  autoHeight = false,
  onScroll,
  onScrollBeginDrag,
  onScrollEndDrag,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
}: VirtualListProps<any>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [measuredItemHeight, setMeasuredItemHeight] = useState(itemHeight);
  const scrollTimeout = useRef<number>(0);
  const momentumTimeout = useRef<number>(0);
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const lastTouchY = useRef<number>(0);
  const velocityY = useRef<number>(0);
  const lastScrollTop = useRef<number>(0);
  const lastScrollTime = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      const entry = entries[0];
      if (entry) {
        setContainerHeight(entry.contentRect.height);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Auto height measurement effect
  useEffect(() => {
    if (autoHeight && items.length > 0) {
      const firstItemRef = itemRefs.current.get(0);
      if (firstItemRef) {
        const rect = firstItemRef.getBoundingClientRect();
        if (rect.height > 0 && rect.height !== measuredItemHeight) {
          setMeasuredItemHeight(rect.height);
        }
      }
    }
  }, [autoHeight, items.length, measuredItemHeight]);

  // Handle touch events for mobile-like scrolling
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!scrollEnabled) return;

      setIsDragging(true);
      lastTouchY.current = e.touches[0].clientY;
      lastScrollTop.current = scrollTop;
      lastScrollTime.current = Date.now();

      if (onScrollBeginDrag) {
        onScrollBeginDrag();
      }

      // Clear any existing momentum scrolling
      if (momentumTimeout.current) {
        window.clearTimeout(momentumTimeout.current);
      }
    },
    [scrollEnabled, scrollTop, onScrollBeginDrag]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!scrollEnabled || !isDragging) return;

      const touchY = e.touches[0].clientY;
      const deltaY = lastTouchY.current - touchY;
      const currentTime = Date.now();
      const timeDelta = currentTime - lastScrollTime.current;

      if (timeDelta > 0) {
        velocityY.current = deltaY / timeDelta;
      }

      if (containerRef.current) {
        containerRef.current.scrollTop += deltaY;
      }

      lastTouchY.current = touchY;
      lastScrollTime.current = currentTime;
    },
    [scrollEnabled, isDragging]
  );

  const handleTouchEnd = useCallback(() => {
    if (!scrollEnabled) return;

    setIsDragging(false);
    if (onScrollEndDrag) {
      onScrollEndDrag();
    }

    // Apply momentum scrolling
    if (Math.abs(velocityY.current) > 0.1) {
      if (onMomentumScrollBegin) {
        onMomentumScrollBegin();
      }

      let momentum = velocityY.current * 500; // Adjust this multiplier to control momentum strength
      let currentVelocity = velocityY.current;
      let lastTime = Date.now();

      const applyMomentum = () => {
        const now = Date.now();
        const deltaTime = now - lastTime;
        lastTime = now;

        // Apply friction
        currentVelocity *= 0.95;

        if (containerRef.current) {
          containerRef.current.scrollTop += currentVelocity * deltaTime;
        }

        if (Math.abs(currentVelocity) > 0.01) {
          momentumTimeout.current = window.requestAnimationFrame(applyMomentum);
        } else {
          if (onMomentumScrollEnd) {
            onMomentumScrollEnd();
          }
        }
      };

      momentumTimeout.current = window.requestAnimationFrame(applyMomentum);
    }
  }, [
    scrollEnabled,
    onScrollEndDrag,
    onMomentumScrollBegin,
    onMomentumScrollEnd,
  ]);

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      if (!scrollEnabled) return;

      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      setScrollTop(scrollTop);
      setIsScrolling(true);

      if (onScroll) {
        onScroll(event);
      }

      // Clear existing timeout
      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }

      // Set new timeout
      scrollTimeout.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      // Check if we've reached the end
      if (onEndReached) {
        const threshold = scrollHeight * endReachedThreshold;
        const currentPosition = scrollTop + clientHeight;
        if (currentPosition >= threshold) {
          onEndReached();
        }
      }
    },
    [scrollEnabled, onScroll, onEndReached, endReachedThreshold]
  );

  // Calculate which items should be visible
  const itemHeightWithSpacing = measuredItemHeight + columnSpacing;
  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / itemHeightWithSpacing) - overscan
  );
  const endIndex = Math.min(
    items.length,
    Math.ceil((scrollTop + containerHeight) / itemHeightWithSpacing) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex);
  const totalHeight = items.length * itemHeightWithSpacing - columnSpacing; // Remove spacing from last item
  const offsetY = startIndex * itemHeightWithSpacing;

  // Fix height calculation for autoHeight mode
  const containerHeight_calculated = autoHeight
    ? Math.min(totalHeight, window.innerHeight * 0.7) // Limit to 70% of viewport height
    : height;

  const containerStyle: React.CSSProperties = {
    height: containerHeight_calculated,
    width,
    overflow: scrollEnabled ? "auto" : "hidden",
    position: "relative",
    WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
    msOverflowStyle: showsVerticalScrollIndicator ? "auto" : "none", // Hide scrollbar in IE/Edge
    scrollbarWidth: showsVerticalScrollIndicator ? "auto" : "none", // Hide scrollbar in Firefox
    ...style,
  };

  // Add WebKit scrollbar styles via className instead
  const scrollbarClass = !showsVerticalScrollIndicator ? "hide-scrollbar" : "";

  return (
    <div
      ref={containerRef}
      className={`virtual-list ${scrollbarClass} ${className}`}
      onScroll={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={containerStyle}
    >
      <div
        style={{
          height: totalHeight,
          position: "relative",
          pointerEvents: isScrolling ? "none" : "auto", // Optimize performance during scroll
        }}
      >
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            willChange: "transform",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map((item, index) => {
            const actualIndex = startIndex + index;
            const isLastItem = actualIndex === items.length - 1;

            return (
              <div
                key={keyExtractor ? keyExtractor(item) : actualIndex}
                className="virtual-list-item"
                ref={(el) => {
                  if (el && autoHeight) {
                    itemRefs.current.set(actualIndex, el);
                  }
                }}
                style={{
                  height: autoHeight ? "auto" : measuredItemHeight,
                  minHeight: autoHeight ? measuredItemHeight : undefined,
                  marginBottom: isLastItem ? 0 : columnSpacing,
                  // Remove position relative that was causing issues
                }}
              >
                {renderItem(item, actualIndex)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
