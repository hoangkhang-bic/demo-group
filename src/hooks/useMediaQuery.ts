import { useEffect, useState } from "react";

// Mobile breakpoints
const MOBILE_BREAKPOINTS = {
  mobile: "(max-width: 767px)",
  tablet: "(min-width: 768px) and (max-width: 1023px)",
  desktop: "(min-width: 1024px)",
  smallMobile: "(max-width: 375px)",
  largeMobile: "(min-width: 376px) and (max-width: 767px)",
} as const;

type BreakpointKey = keyof typeof MOBILE_BREAKPOINTS;

export const useMobileLayout = (breakpoint: BreakpointKey = "mobile") => {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    // Check if window is available (for SSR)
    if (typeof window === "undefined") return;

    const mediaQuery = MOBILE_BREAKPOINTS[breakpoint];
    const media = window.matchMedia(mediaQuery);

    // Set initial value
    setIsMatch(media.matches);

    // Create event listener
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMatch(event.matches);
    };

    // Add listener
    try {
      media.addEventListener("change", handleChange);
    } catch (e) {
      // Fallback for older browsers
      (media as any).addListener(handleChange);
    }

    // Cleanup
    return () => {
      try {
        media.removeEventListener("change", handleChange);
      } catch (e) {
        // Fallback for older browsers
        (media as any).removeListener(handleChange);
      }
    };
  }, [breakpoint]);

  return isMatch;
};

// Convenience hooks for common mobile checks
export const useIsMobile = () => useMobileLayout("mobile");
export const useIsTablet = () => useMobileLayout("tablet");
export const useIsDesktop = () => useMobileLayout("desktop");
export const useIsSmallMobile = () => useMobileLayout("smallMobile");
export const useIsLargeMobile = () => useMobileLayout("largeMobile");
