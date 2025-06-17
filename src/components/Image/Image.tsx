import React, {
  useState,
  useEffect,
  useRef,
  ImgHTMLAttributes,
  ObjectHTMLAttributes,
  useMemo,
} from "react";
import "./Image.css";

// Define resize modes similar to React Native
type ResizeMode = "cover" | "contain" | "stretch" | "center" | "repeat";

// Define aspect ratios
type AspectRatio = "1:1" | "4:3" | "16:9" | "3:2" | "2:3" | number;

// Image cache to store loaded images
interface CachedImage {
  url: string;
  loaded: boolean;
  error: boolean;
  timestamp: number;
}

// Global image cache
const imageCache = new Map<string, CachedImage>();

// Cache control
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds
const MAX_CACHE_SIZE = 100; // Maximum number of cached images

// Clean up old cache entries
const cleanupCache = () => {
  if (imageCache.size > MAX_CACHE_SIZE) {
    // Sort by timestamp and remove oldest entries
    const entries = Array.from(imageCache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);

    // Remove oldest entries until we're back to the max size
    const entriesToRemove = entries.slice(0, entries.length - MAX_CACHE_SIZE);
    entriesToRemove.forEach(([key]) => imageCache.delete(key));
  }
};

interface ImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "width" | "height"> {
  // Source
  source: string;
  // Dimensions (can be number or string like '100%')
  width?: number | string;
  height?: number | string;
  // React Native-like props
  resizeMode?: ResizeMode;
  aspectRatio?: AspectRatio;
  borderRadius?: number | string;
  // Responsive behavior
  responsiveHideOnMobile?: boolean;
  responsiveSmallerOnMobile?: boolean;
  // Visual effects
  tintColor?: string;
  fadeDuration?: number;
  progressive?: boolean;
  // Placeholder
  placeholderSource?: string;
  // SVG specific props
  svg?: boolean;
  svgProps?: {
    fill?: string;
    stroke?: string;
    strokeWidth?: number | string;
    preserveAspectRatio?: string;
  };
  // Lazy loading
  lazyLoad?: boolean;
  lazyLoadThreshold?: number;
  // Caching options
  disableCache?: boolean;
  cacheKey?: string;
  // Event handlers
  onLoadStart?: () => void;
  onLoad?: () => void;
  onError?: () => void;
  // Styling
  style?: React.CSSProperties;
  className?: string;
}

const Image: React.FC<ImageProps> = ({
  source,
  width,
  height,
  resizeMode = "cover",
  aspectRatio,
  borderRadius,
  responsiveHideOnMobile = false,
  responsiveSmallerOnMobile = false,
  tintColor,
  fadeDuration,
  progressive = false,
  placeholderSource,
  svg = false,
  svgProps = {},
  lazyLoad = false,
  lazyLoadThreshold = 0.1,
  disableCache = false,
  cacheKey,
  onLoadStart,
  onLoad,
  onError,
  style = {},
  className = "",
  alt = "",
  ...otherProps
}) => {
  // Use custom cache key or source URL
  const imageCacheKey = useMemo(() => cacheKey || source, [cacheKey, source]);

  // Initial states based on cache
  const cachedImage = !disableCache ? imageCache.get(imageCacheKey) : undefined;

  const [isLoading, setIsLoading] = useState(!cachedImage?.loaded);
  const [isError, setIsError] = useState(cachedImage?.error || false);
  const [isLoaded, setIsLoaded] = useState(cachedImage?.loaded || false);
  const [currentSource, setCurrentSource] = useState(
    cachedImage?.loaded ? source : placeholderSource || (lazyLoad ? "" : source)
  );
  const [isInView, setIsInView] = useState(!lazyLoad);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Detect if the source is an SVG if not explicitly set
  const isSvg = svg || source.toLowerCase().endsWith(".svg");

  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (!lazyLoad) return;

    const ref = containerRef.current || imageRef.current;
    if (!ref) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: lazyLoadThreshold }
    );

    observer.observe(ref);

    return () => {
      observer.unobserve(ref);
    };
  }, [lazyLoad, lazyLoadThreshold]);

  // Handle image loading
  useEffect(() => {
    if (!isInView) return;

    // Check cache first
    if (!disableCache && imageCache.has(imageCacheKey)) {
      const cached = imageCache.get(imageCacheKey)!;

      // If the image is already cached and loaded successfully
      if (cached.loaded && !cached.error) {
        setIsLoading(false);
        setIsError(false);
        setIsLoaded(true);
        setCurrentSource(source);

        // Update timestamp to keep this entry fresh
        imageCache.set(imageCacheKey, {
          ...cached,
          timestamp: Date.now(),
        });

        // Call onLoad callback if provided
        if (onLoad) onLoad();
        return;
      }

      // If cached but with error, check if cache is expired
      if (cached.error && Date.now() - cached.timestamp < CACHE_EXPIRY) {
        setIsLoading(false);
        setIsError(true);
        setIsLoaded(false);

        // Call onError callback if provided
        if (onError) onError();
        return;
      }

      // Otherwise, try loading again (cache expired or needs refresh)
    }

    setIsLoading(true);
    setIsError(false);
    setIsLoaded(false);

    if (onLoadStart) {
      onLoadStart();
    }

    // If progressive loading is enabled, start with placeholder
    if (progressive && placeholderSource) {
      setCurrentSource(placeholderSource);
    } else {
      setCurrentSource(source);
    }

    // If it's an SVG with special props, we'll handle it differently
    // and won't use the image cache for those
    if (isSvg && Object.keys(svgProps).length > 0) {
      return;
    }

    // Preload the image to ensure it's cached by the browser
    if (!disableCache) {
      const img = new window.Image();
      img.src = source;

      img.onload = () => {
        // Update cache
        imageCache.set(imageCacheKey, {
          url: source,
          loaded: true,
          error: false,
          timestamp: Date.now(),
        });

        cleanupCache();
      };

      img.onerror = () => {
        // Cache the error state
        imageCache.set(imageCacheKey, {
          url: source,
          loaded: false,
          error: true,
          timestamp: Date.now(),
        });
      };
    }
  }, [
    source,
    imageCacheKey,
    placeholderSource,
    progressive,
    onLoadStart,
    isInView,
    disableCache,
    isSvg,
    svgProps,
    onLoad,
    onError,
  ]);

  // Build class names
  const classNames = ["rn-image"];

  // Add SVG specific class
  if (isSvg) {
    classNames.push("rn-image--svg");
  }

  // Add resize mode class
  if (resizeMode) {
    classNames.push(`rn-image--${resizeMode}`);
  }

  // Add border radius class if using predefined values
  if (typeof borderRadius === "string") {
    if (["sm", "md", "lg", "full"].includes(borderRadius)) {
      classNames.push(`rn-image--rounded-${borderRadius}`);
    }
  }

  // Add responsive classes
  if (responsiveHideOnMobile) {
    classNames.push("rn-image--responsive-hide");
  }

  if (responsiveSmallerOnMobile) {
    classNames.push("rn-image--responsive-smaller");
  }

  // Add state classes
  if (isLoading) {
    classNames.push("rn-image--loading");
  }

  if (isLoaded) {
    classNames.push("rn-image--loaded");
  }

  if (isError) {
    classNames.push("rn-image--error");
  }

  // Add animation class if fade duration is specified
  if (fadeDuration) {
    classNames.push("rn-image--fade-in");
  }

  // Add progressive loading class
  if (progressive) {
    classNames.push("rn-image--progressive");
  }

  // Add lazy loading class
  if (lazyLoad) {
    classNames.push("rn-image--lazy");
    if (!isInView) {
      classNames.push("rn-image--not-in-view");
    }
  }

  // Add cache class
  if (!disableCache) {
    classNames.push("rn-image--cached");
  }

  // Add tint color class if specified
  if (tintColor) {
    classNames.push("rn-image--tint-overlay");
  }

  // Add custom class name if provided
  if (className) {
    classNames.push(className);
  }

  // Build inline styles
  const inlineStyles: React.CSSProperties = {
    ...style,
  };

  // Add width and height if specified
  if (width !== undefined) {
    inlineStyles.width = width;
  }

  if (height !== undefined) {
    inlineStyles.height = height;
  }

  // Add border radius if specified as number
  if (typeof borderRadius === "number") {
    inlineStyles.borderRadius = `${borderRadius}px`;
  } else if (
    borderRadius &&
    !["sm", "md", "lg", "full"].includes(borderRadius)
  ) {
    // Add custom border radius if not using predefined values
    inlineStyles.borderRadius = borderRadius;
  }

  // Add animation duration if specified
  if (fadeDuration) {
    inlineStyles.animationDuration = `${fadeDuration}ms`;
  }

  // Add tint color if specified
  if (tintColor) {
    inlineStyles.backgroundColor = tintColor;
  }

  // Handle image events
  const handleLoad = () => {
    setIsLoading(false);
    setIsLoaded(true);

    // Update cache
    if (!disableCache) {
      imageCache.set(imageCacheKey, {
        url: source,
        loaded: true,
        error: false,
        timestamp: Date.now(),
      });

      cleanupCache();
    }

    // If progressive loading is enabled and we're showing the placeholder,
    // switch to the actual image
    if (progressive && currentSource === placeholderSource) {
      setCurrentSource(source);
    }

    if (onLoad) {
      onLoad();
    }
  };

  const handleError = () => {
    setIsLoading(false);
    setIsError(true);

    // Cache error state
    if (!disableCache) {
      imageCache.set(imageCacheKey, {
        url: source,
        loaded: false,
        error: true,
        timestamp: Date.now(),
      });
    }

    if (onError) {
      onError();
    }
  };

  // If the image is an SVG and we need to render it with special props
  if (isSvg && Object.keys(svgProps).length > 0) {
    // Extract only the props that are valid for object elements
    const objectProps: ObjectHTMLAttributes<HTMLObjectElement> = {
      className: classNames.join(" "),
      style: inlineStyles,
      onLoad: handleLoad as any,
      onError: handleError as any,
      // We use data attribute instead of src for object elements
      data: isInView ? currentSource : undefined,
      type: "image/svg+xml",
    };

    // For SVG with special handling, we use an object tag
    const svgComponent = (
      <div ref={containerRef}>
        <object {...objectProps}>
          {/* Fallback for browsers that don't support SVG */}
          <img
            src={isInView ? currentSource : undefined}
            alt={alt}
            className={classNames.join(" ")}
            style={inlineStyles}
            onLoad={handleLoad}
            onError={handleError}
            ref={imageRef}
          />
        </object>
      </div>
    );

    // If using aspect ratio, wrap the SVG in a container
    if (aspectRatio) {
      let aspectRatioClass = "";

      // Handle predefined aspect ratios
      if (typeof aspectRatio === "string") {
        const ratioMap: Record<string, string> = {
          "1:1": "1-1",
          "4:3": "4-3",
          "16:9": "16-9",
          "3:2": "3-2",
          "2:3": "2-3",
        };

        if (ratioMap[aspectRatio]) {
          aspectRatioClass = `rn-image-container--${ratioMap[aspectRatio]}`;
        }
      }

      return (
        <div
          className={`rn-image-container ${aspectRatioClass}`}
          style={
            aspectRatio && typeof aspectRatio === "number"
              ? { paddingTop: `${(1 / aspectRatio) * 100}%` }
              : {}
          }
          ref={containerRef}
          data-loaded={isLoaded.toString()}
          data-cached={!disableCache ? "true" : "false"}
        >
          {svgComponent}
        </div>
      );
    }

    return svgComponent;
  }

  // If using aspect ratio, wrap the image in a container
  if (aspectRatio) {
    let aspectRatioClass = "";

    // Handle predefined aspect ratios
    if (typeof aspectRatio === "string") {
      const ratioMap: Record<string, string> = {
        "1:1": "1-1",
        "4:3": "4-3",
        "16:9": "16-9",
        "3:2": "3-2",
        "2:3": "2-3",
      };

      if (ratioMap[aspectRatio]) {
        aspectRatioClass = `rn-image-container--${ratioMap[aspectRatio]}`;
      }
    } else if (typeof aspectRatio === "number") {
      // Handle custom aspect ratio
      const paddingTop = `${(1 / aspectRatio) * 100}%`;
      inlineStyles.paddingTop = paddingTop;
    }

    return (
      <div
        className={`rn-image-container ${aspectRatioClass}`}
        style={
          aspectRatio && typeof aspectRatio === "number"
            ? { paddingTop: `${(1 / aspectRatio) * 100}%` }
            : {}
        }
        ref={containerRef}
        data-loaded={isLoaded.toString()}
        data-cached={!disableCache ? "true" : "false"}
      >
        <img
          src={isInView ? currentSource : undefined}
          alt={alt}
          className={classNames.join(" ")}
          style={inlineStyles}
          onLoad={handleLoad}
          onError={handleError}
          ref={imageRef}
          {...otherProps}
        />
      </div>
    );
  }

  // Regular image without aspect ratio container
  return (
    <img
      src={isInView ? currentSource : undefined}
      alt={alt}
      className={classNames.join(" ")}
      style={inlineStyles}
      onLoad={handleLoad}
      onError={handleError}
      ref={imageRef}
      {...otherProps}
    />
  );
};

export default Image;
