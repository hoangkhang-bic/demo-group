import { useState, useEffect } from 'react';
import { getSafeAreaInsets, isClient } from '@/utils/platform';

interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

/**
 * Hook to access safe area insets programmatically
 * @returns {SafeAreaInsets} The current safe area insets
 */
export function useSafeAreaInsets(): SafeAreaInsets {
  const [insets, setInsets] = useState<SafeAreaInsets>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  });

  useEffect(() => {
    if (!isClient) return;

    // Get initial insets
    setInsets(getSafeAreaInsets());

    // Update insets on orientation change or resize
    const handleChange = () => {
      // Small timeout to ensure values are updated after orientation change
      setTimeout(() => {
        setInsets(getSafeAreaInsets());
      }, 100);
    };

    window.addEventListener('orientationchange', handleChange);
    window.addEventListener('resize', handleChange);

    // Clean up event listeners
    return () => {
      window.removeEventListener('orientationchange', handleChange);
      window.removeEventListener('resize', handleChange);
    };
  }, []);

  return insets;
}

/**
 * Hook to get a specific safe area inset
 * @param {keyof SafeAreaInsets} side - The side to get the inset for
 * @returns {number} The inset value in pixels
 */
export function useSafeAreaInset(side: keyof SafeAreaInsets): number {
  const insets = useSafeAreaInsets();
  return insets[side];
}

export default useSafeAreaInsets; 