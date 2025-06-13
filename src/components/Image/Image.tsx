import React, {
  useState,
  useEffect,
  ImgHTMLAttributes,
  ObjectHTMLAttributes,
} from "react";
import "./Image.css";

// Define resize modes similar to React Native
type ResizeMode = "cover" | "contain" | "stretch" | "center" | "repeat";

// Define aspect ratios
type AspectRatio = "1:1" | "4:3" | "16:9" | "3:2" | "2:3" | number;

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
  onLoadStart,
  onLoad,
  onError,
  style = {},
  className = "",
  alt = "",
  ...otherProps
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSource, setCurrentSource] = useState(
    placeholderSource || source
  );

  // Detect if the source is an SVG if not explicitly set
  const isSvg = svg || source.toLowerCase().endsWith(".svg");

  // Handle image loading
  useEffect(() => {
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
  }, [source, placeholderSource, progressive, onLoadStart]);

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
      data: currentSource,
      type: "image/svg+xml",
    };

    // For SVG with special handling, we use an object tag
    const svgComponent = (
      <object {...objectProps}>
        {/* Fallback for browsers that don't support SVG */}
        <img
          src={currentSource}
          alt={alt}
          className={classNames.join(" ")}
          style={inlineStyles}
          onLoad={handleLoad}
          onError={handleError}
        />
      </object>
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
      >
        <img
          src={currentSource}
          alt={alt}
          className={classNames.join(" ")}
          style={inlineStyles}
          onLoad={handleLoad}
          onError={handleError}
          {...otherProps}
        />
      </div>
    );
  }

  // Regular image without aspect ratio container
  return (
    <img
      src={currentSource}
      alt={alt}
      className={classNames.join(" ")}
      style={inlineStyles}
      onLoad={handleLoad}
      onError={handleError}
      {...otherProps}
    />
  );
};

export default Image;
