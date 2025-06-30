import React, { useEffect, useRef, useState, useCallback } from "react";
import "./virtual-list.css";

type ScrollDirection = "vertical" | "horizontal";

interface ListRenderItemInfo<T> {
  item: T;
  index: number;
  separators: {
    highlight: () => void;
    unhighlight: () => void;
    updateProps: (select: "leading" | "trailing", newProps: any) => void;
  };
}

interface VirtualListProps<T> {
  data: T[];
  renderItem: (info: ListRenderItemInfo<T>) => React.ReactNode;
  getItemLayout?: (
    data: T[] | null | undefined,
    index: number
  ) => {
    length: number;
    offset: number;
    index: number;
  };
  horizontal?: boolean;
  numColumns?: number;
  initialNumToRender?: number;
  keyExtractor?: (item: T, index: number) => string;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  onRefresh?: () => void;
  refreshing?: boolean;
  ListHeaderComponent?: React.ReactNode;
  ListFooterComponent?: React.ReactNode;
  ListEmptyComponent?: React.ReactNode;
  ItemSeparatorComponent?: React.ComponentType<{
    highlighted: boolean;
    leadingItem: T | null;
  }>;
  inverted?: boolean;

  // Style props
  style?: React.CSSProperties;
  contentContainerStyle?: React.CSSProperties;
  className?: string;
  height?: number | string;
  width?: number | string;

  // Scroll indicators
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;

  // Spacing
  columnSpacing?: number;
  rowSpacing?: number;

  // Scroll events
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
  onScrollBeginDrag?: () => void;
  onScrollEndDrag?: () => void;
  onMomentumScrollBegin?: () => void;
  onMomentumScrollEnd?: () => void;

  // Dimensions
  itemHeight?: number;
  itemWidth?: number;

  // Other
  scrollEnabled?: boolean;
  maintainVisibleContentPosition?: {
    minIndexForVisible: number;
    autoscrollToTopThreshold?: number;
  };
}

export default function VirtualList<T>({
  data,
  renderItem,
  getItemLayout,
  horizontal = false,
  numColumns = 1,
  initialNumToRender = 10,
  keyExtractor,
  onEndReached,
  onEndReachedThreshold = 0.8,
  onRefresh,
  refreshing = false,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  ItemSeparatorComponent,
  inverted = false,
  style,
  contentContainerStyle,
  className = "",
  height = "100%",
  width = "100%",
  showsHorizontalScrollIndicator = true,
  showsVerticalScrollIndicator = true,
  columnSpacing = 8,
  rowSpacing = 8,
  onScroll,
  onScrollBeginDrag,
  onScrollEndDrag,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  itemHeight = 60,
  itemWidth = 200,
  scrollEnabled = true,
  maintainVisibleContentPosition,
}: VirtualListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(refreshing);
  const [measuredItemHeight, setMeasuredItemHeight] = useState(itemHeight);
  const [measuredItemWidth, setMeasuredItemWidth] = useState(itemWidth);
  const scrollTimeout = useRef<number>(0);
  const momentumTimeout = useRef<number>(0);
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const lastTouchY = useRef<number>(0);
  const lastTouchX = useRef<number>(0);
  const velocityY = useRef<number>(0);
  const velocityX = useRef<number>(0);
  const lastScrollTop = useRef<number>(0);
  const lastScrollLeft = useRef<number>(0);
  const lastScrollTime = useRef<number>(0);
  const pullToRefreshThreshold = 60; // pixels
  const refreshStartPosition = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      const entry = entries[0];
      if (entry) {
        setContainerHeight(entry.contentRect.height);
        setContainerWidth(entry.contentRect.width);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    setIsRefreshing(refreshing);
  }, [refreshing]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!scrollEnabled) return;

      setIsDragging(true);
      lastTouchY.current = e.touches[0].clientY;
      lastTouchX.current = e.touches[0].clientX;
      lastScrollTop.current = scrollTop;
      lastScrollLeft.current = scrollLeft;
      lastScrollTime.current = Date.now();
      refreshStartPosition.current = horizontal
        ? e.touches[0].clientX
        : e.touches[0].clientY;

      if (onScrollBeginDrag) {
        onScrollBeginDrag();
      }

      if (momentumTimeout.current) {
        window.clearTimeout(momentumTimeout.current);
      }
    },
    [scrollEnabled, scrollTop, scrollLeft, onScrollBeginDrag, horizontal]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!scrollEnabled || !isDragging) return;

      const touchY = e.touches[0].clientY;
      const touchX = e.touches[0].clientX;
      const deltaY = lastTouchY.current - touchY;
      const deltaX = lastTouchX.current - touchX;
      const currentTime = Date.now();
      const timeDelta = currentTime - lastScrollTime.current;

      // Handle pull-to-refresh
      if (onRefresh && !isRefreshing && !horizontal) {
        const pullDistance = touchY - refreshStartPosition.current;
        if (pullDistance > pullToRefreshThreshold && scrollTop <= 0) {
          setIsRefreshing(true);
          onRefresh();
        }
      }

      if (timeDelta > 0) {
        if (horizontal) {
          velocityX.current = deltaX / timeDelta;
        } else {
          velocityY.current = deltaY / timeDelta;
        }
      }

      if (containerRef.current) {
        if (horizontal) {
          containerRef.current.scrollLeft += deltaX;
        } else {
          containerRef.current.scrollTop += deltaY;
        }
      }

      lastTouchY.current = touchY;
      lastTouchX.current = touchX;
      lastScrollTime.current = currentTime;
    },
    [scrollEnabled, isDragging, horizontal, onRefresh, isRefreshing, scrollTop]
  );

  const handleTouchEnd = useCallback(() => {
    if (!scrollEnabled) return;

    setIsDragging(false);
    if (onScrollEndDrag) {
      onScrollEndDrag();
    }

    // Apply momentum scrolling
    const velocity = horizontal ? velocityX.current : velocityY.current;
    if (Math.abs(velocity) > 0.1) {
      if (onMomentumScrollBegin) {
        onMomentumScrollBegin();
      }

      let currentVelocity = velocity;
      let lastTime = Date.now();

      const applyMomentum = () => {
        const now = Date.now();
        const deltaTime = now - lastTime;
        lastTime = now;

        // Apply friction
        currentVelocity *= 0.95;

        if (containerRef.current) {
          if (horizontal) {
            containerRef.current.scrollLeft += currentVelocity * deltaTime;
          } else {
            containerRef.current.scrollTop += currentVelocity * deltaTime;
          }
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
    horizontal,
    onScrollEndDrag,
    onMomentumScrollBegin,
    onMomentumScrollEnd,
  ]);

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      if (!scrollEnabled) return;

      const {
        scrollTop,
        scrollLeft,
        scrollHeight,
        scrollWidth,
        clientHeight,
        clientWidth,
      } = event.currentTarget;

      if (horizontal) {
        setScrollLeft(scrollLeft);
      } else {
        setScrollTop(scrollTop);
      }

      setIsScrolling(true);

      if (onScroll) {
        onScroll(event);
      }

      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      // Check if we've reached the end
      if (onEndReached) {
        if (horizontal) {
          const threshold = scrollWidth * onEndReachedThreshold;
          const currentPosition = scrollLeft + clientWidth;
          if (currentPosition >= threshold) {
            onEndReached();
          }
        } else {
          const threshold = scrollHeight * onEndReachedThreshold;
          const currentPosition = scrollTop + clientHeight;
          if (currentPosition >= threshold) {
            onEndReached();
          }
        }
      }
    },
    [scrollEnabled, horizontal, onScroll, onEndReached, onEndReachedThreshold]
  );

  // Calculate grid layout
  const itemsPerRow = horizontal ? 1 : numColumns;
  const rows = Math.ceil(data.length / itemsPerRow);

  // Calculate which items should be visible
  const itemSize = horizontal ? measuredItemWidth : measuredItemHeight;
  const spacing = horizontal ? columnSpacing : rowSpacing;
  const itemSizeWithSpacing = itemSize + spacing;
  const scroll = horizontal ? scrollLeft : scrollTop;
  const containerSize = horizontal ? containerWidth : containerHeight;

  const startIndex = Math.max(
    0,
    Math.floor(scroll / itemSizeWithSpacing) * itemsPerRow
  );
  const endIndex = Math.min(
    data.length,
    Math.ceil((scroll + containerSize) / itemSizeWithSpacing) * itemsPerRow +
      itemsPerRow
  );

  const visibleData = data.slice(startIndex, endIndex);
  const totalSize = rows * itemSize + (rows - 1) * spacing;
  const offset = Math.floor(startIndex / itemsPerRow) * itemSizeWithSpacing;

  const containerStyle: React.CSSProperties = {
    height,
    width,
    overflow: scrollEnabled ? "auto" : "hidden",
    position: "relative",
    WebkitOverflowScrolling: "touch",
    overflowY: !horizontal
      ? showsVerticalScrollIndicator
        ? "auto"
        : "hidden"
      : "hidden",
    overflowX: horizontal
      ? showsHorizontalScrollIndicator
        ? "auto"
        : "hidden"
      : "hidden",
    transform: inverted ? "scaleY(-1)" : undefined,
    ...style,
  };

  const contentStyle: React.CSSProperties = {
    height: horizontal ? "100%" : totalSize,
    width: horizontal ? totalSize : "100%",
    position: "relative",
    pointerEvents: isScrolling ? "none" : "auto",
    padding: spacing / 2,
    boxSizing: "border-box",
    ...contentContainerStyle,
  };

  const scrollbarClass = [
    !showsVerticalScrollIndicator && !horizontal ? "hide-scrollbar-y" : "",
    !showsHorizontalScrollIndicator && horizontal ? "hide-scrollbar-x" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Render empty list component if no data
  if (data.length === 0 && ListEmptyComponent) {
    return (
      <div
        ref={containerRef}
        className={`virtual-list ${scrollbarClass}`}
        style={containerStyle}
      >
        {ListEmptyComponent}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`virtual-list ${scrollbarClass}`}
      onScroll={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={containerStyle}
    >
      {isRefreshing && (
        <div className="refresh-indicator">
          <div className="refresh-spinner" />
        </div>
      )}

      <div style={contentStyle}>
        {ListHeaderComponent}
        <div
          style={{
            transform: horizontal
              ? `translateX(${offset}px)`
              : `translateY(${offset}px)`,
            willChange: "transform",
            position: "absolute",
            top: 0,
            left: 0,
            right: horizontal ? undefined : 0,
            bottom: !horizontal ? undefined : 0,
            display: "flex",
            flexDirection: horizontal ? "row" : "column",
            flexWrap: horizontal ? "nowrap" : "wrap",
            ...(inverted ? { transform: "scaleY(-1)" } : {}),
          }}
        >
          {visibleData.map((item, index) => {
            const actualIndex = startIndex + index;
            const isLastItem = actualIndex === data.length - 1;
            const isLastInRow = (actualIndex + 1) % numColumns === 0;
            const rowIndex = Math.floor(actualIndex / numColumns);
            const isLastRow = rowIndex === rows - 1;

            const itemStyle: React.CSSProperties = {
              height: horizontal
                ? "100%"
                : getItemLayout?.(data, actualIndex)?.length ??
                  measuredItemHeight,
              width: !horizontal
                ? `calc(${100 / numColumns}% - ${
                    ((numColumns - 1) * columnSpacing) / numColumns
                  }px)`
                : getItemLayout?.(data, actualIndex)?.length ??
                  measuredItemWidth,
              marginBottom: !horizontal && !isLastRow ? rowSpacing : 0,
              marginRight: horizontal || !isLastInRow ? columnSpacing : 0,
              flexShrink: 0,
              flexGrow: 0,
              boxSizing: "border-box",
            };

            const separators = {
              highlight: () => {},
              unhighlight: () => {},
              updateProps: () => {},
            };

            const itemContent = (
              <div
                key={
                  keyExtractor ? keyExtractor(item, actualIndex) : actualIndex
                }
                className="virtual-list-item"
                ref={(el) => {
                  if (el) {
                    itemRefs.current.set(actualIndex, el);
                  }
                }}
                style={itemStyle}
              >
                {renderItem({ item, index: actualIndex, separators })}
              </div>
            );

            if (ItemSeparatorComponent && !isLastItem) {
              return (
                <React.Fragment key={`${actualIndex}-fragment`}>
                  {itemContent}
                  <ItemSeparatorComponent
                    highlighted={false}
                    leadingItem={item}
                  />
                </React.Fragment>
              );
            }

            return itemContent;
          })}
        </div>
        {ListFooterComponent}
      </div>
    </div>
  );
}
