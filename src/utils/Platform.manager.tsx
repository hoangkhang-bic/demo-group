import React, { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { getPlatform, isMobile } from "@/utils/platform";
import { useIsDesktop, useIsMobile } from "@/hooks/useMediaQuery";

// Lazy load components for better performance
const CommunitiesMobile = React.lazy(
  () => import("../pages/CommunitiesPage/Communities.mb")
);
const CommunitiesWeb = React.lazy(
  () => import("../pages/CommunitiesPage/Communities.web")
);

interface PlatformManagerProps {
  forceMode?: "mobile" | "web" | "auto";
  fallbackComponent?: React.ComponentType;
  loadingComponent?: React.ComponentType;
}

interface PlatformInfo {
  isNative: boolean;
  isMobileDevice: boolean;
  isDesktopScreen: boolean;
  capacitorPlatform: "web" | "ios" | "android";
  shouldUseMobileUI: boolean;
  shouldUseWebUI: boolean;
}

/**
 * Platform Manager for Communities Page
 *
 * Intelligently determines which version of the Communities component to render
 * based on platform capabilities, screen size, and user preferences.
 */
const PlatformManager: React.FC<PlatformManagerProps> = ({
  forceMode = "auto",
  fallbackComponent: FallbackComponent,
  loadingComponent: LoadingComponent,
}) => {
  const [platformInfo, setPlatformInfo] = useState<PlatformInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Media query hooks for responsive behavior
  const isDesktopScreen = useIsDesktop();
  const isMobileScreen = useIsMobile();

  useEffect(() => {
    const detectPlatform = async () => {
      try {
        // Get platform information
        const capacitorPlatform = Capacitor.getPlatform() as
          | "web"
          | "ios"
          | "android";
        const isNative = Capacitor.isNativePlatform();
        const isMobileDevice = isMobile();

        // Determine UI mode based on multiple factors
        const shouldUseMobileUI = determineMobileUI({
          forceMode,
          isNative,
          isMobileDevice,
          isMobileScreen,
          capacitorPlatform,
        });

        const platform: PlatformInfo = {
          isNative,
          isMobileDevice,
          isDesktopScreen,
          capacitorPlatform,
          shouldUseMobileUI,
          shouldUseWebUI: !shouldUseMobileUI,
        };

        setPlatformInfo(platform);

        // Add slight delay to prevent flash
        setTimeout(() => setIsLoading(false), 100);

        // Log platform info for debugging
        console.log("Platform Manager - Detected platform:", platform);
      } catch (error) {
        console.error("Platform detection failed:", error);

        // Fallback to web version on error
        setPlatformInfo({
          isNative: false,
          isMobileDevice: false,
          isDesktopScreen: true,
          capacitorPlatform: "web",
          shouldUseMobileUI: false,
          shouldUseWebUI: true,
        });

        setIsLoading(false);
      }
    };

    detectPlatform();
  }, [forceMode, isMobileScreen, isDesktopScreen]);

  // Loading state
  if (isLoading || !platformInfo) {
    if (LoadingComponent) {
      return <LoadingComponent />;
    }

    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-gray-500">Loading Communities...</p>
        </div>
      </div>
    );
  }

  // Error fallback
  if (FallbackComponent) {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <FallbackComponent />
      </React.Suspense>
    );
  }

  // Render appropriate component based on platform detection
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      }
    >
      <PlatformRenderer platformInfo={platformInfo} />
    </React.Suspense>
  );
};

/**
 * Platform-specific component renderer
 */
const PlatformRenderer: React.FC<{ platformInfo: PlatformInfo }> = ({
  platformInfo,
}) => {
  if (platformInfo.shouldUseMobileUI) {
    return <CommunitiesMobile />;
  }

  return <CommunitiesWeb />;
};

/**
 * Logic to determine if mobile UI should be used
 */
function determineMobileUI({
  forceMode,
  isNative,
  isMobileDevice,
  isMobileScreen,
  capacitorPlatform,
}: {
  forceMode: "mobile" | "web" | "auto";
  isNative: boolean;
  isMobileDevice: boolean;
  isMobileScreen: boolean;
  capacitorPlatform: "web" | "ios" | "android";
}): boolean {
  // Force mode overrides
  if (forceMode === "mobile") return true;
  if (forceMode === "web") return false;

  // Auto detection logic

  // Native apps always use mobile UI
  if (
    isNative &&
    (capacitorPlatform === "ios" || capacitorPlatform === "android")
  ) {
    return true;
  }

  // Mobile devices with small screens use mobile UI
  if (isMobileDevice && isMobileScreen) {
    return true;
  }

  // Small screens regardless of device type use mobile UI
  if (isMobileScreen) {
    return true;
  }

  // Everything else uses web UI
  return false;
}

/**
 * Hook for getting current platform information
 */
export const usePlatformInfo = (): PlatformInfo | null => {
  const [platformInfo, setPlatformInfo] = useState<PlatformInfo | null>(null);
  const isDesktopScreen = useIsDesktop();
  const isMobileScreen = useIsMobile();

  useEffect(() => {
    const capacitorPlatform = Capacitor.getPlatform() as
      | "web"
      | "ios"
      | "android";
    const isNative = Capacitor.isNativePlatform();
    const isMobileDevice = isMobile();

    const shouldUseMobileUI = determineMobileUI({
      forceMode: "auto",
      isNative,
      isMobileDevice,
      isMobileScreen,
      capacitorPlatform,
    });

    setPlatformInfo({
      isNative,
      isMobileDevice,
      isDesktopScreen,
      capacitorPlatform,
      shouldUseMobileUI,
      shouldUseWebUI: !shouldUseMobileUI,
    });
  }, [isMobileScreen, isDesktopScreen]);

  return platformInfo;
};

/**
 * Higher-order component for platform-aware components
 */
export const withPlatformManager = <P extends object>(
  MobileComponent: React.ComponentType<P>,
  WebComponent: React.ComponentType<P>
) => {
  return (props: P & { forceMode?: "mobile" | "web" | "auto" }) => {
    const { forceMode = "auto", ...componentProps } = props;
    const platformInfo = usePlatformInfo();

    if (!platformInfo) {
      return <div>Loading...</div>;
    }

    const Component = platformInfo.shouldUseMobileUI
      ? MobileComponent
      : WebComponent;
    return <Component {...(componentProps as P)} />;
  };
};

export default PlatformManager;
export type { PlatformInfo, PlatformManagerProps };
