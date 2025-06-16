/**
 * Platform detection utility functions
 */

export const isClient = typeof window !== 'undefined';

/**
 * Detects if the current device is running iOS
 */
export const isIOS = (): boolean => {
  if (!isClient) return false;
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent) || 
         (userAgent.includes('mac') && 'ontouchend' in document);
};

/**
 * Detects if the current device is running Android
 */
export const isAndroid = (): boolean => {
  if (!isClient) return false;
  return /android/.test(window.navigator.userAgent.toLowerCase());
};

/**
 * Detects if the current device is a mobile device
 */
export const isMobile = (): boolean => {
  if (!isClient) return false;
  return isIOS() || isAndroid() || /mobile|tablet/.test(window.navigator.userAgent.toLowerCase());
};

/**
 * Gets the current platform name
 */
export const getPlatform = (): 'ios' | 'android' | 'web' => {
  if (isIOS()) return 'ios';
  if (isAndroid()) return 'android';
  return 'web';
};

/**
 * Checks if the device has a notch (iPhone X or newer)
 */
export const hasNotch = (): boolean => {
  if (!isClient || !isIOS()) return false;
  
  // Check for iOS devices with notch
  const ratio = window.devicePixelRatio || 1;
  const screen = {
    width: window.screen.width * ratio,
    height: window.screen.height * ratio
  };
  
  // iPhone X, XS, 11 Pro, 12 mini, 13 mini
  const matchesDeviceWidth = (width: number) => screen.width === width || screen.height === width;
  
  return (
    matchesDeviceWidth(1125) || // iPhone X, XS, 11 Pro
    matchesDeviceWidth(1170) || // iPhone 12 mini, 13 mini
    matchesDeviceWidth(1179) || // iPhone 13 Pro, 14 Pro
    matchesDeviceWidth(1242) || // iPhone XS Max, 11 Pro Max
    matchesDeviceWidth(1284) || // iPhone 12, 12 Pro, 13, 14
    matchesDeviceWidth(1290) || // iPhone 14 Pro Max
    matchesDeviceWidth(1170) || // iPhone 12 mini, 13 mini
    matchesDeviceWidth(1080)    // iPhone 14 Plus
  );
};

/**
 * Gets the safe area insets for the current device
 */
export const getSafeAreaInsets = (): { top: number; bottom: number; left: number; right: number } => {
  const defaultInsets = { top: 0, bottom: 0, left: 0, right: 0 };
  
  if (!isClient) return defaultInsets;
  
  // Try to get CSS environment variables
  try {
    const computedStyle = getComputedStyle(document.documentElement);
    
    const getInsetValue = (prop: string): number => {
      const value = computedStyle.getPropertyValue(prop);
      return value ? parseInt(value, 10) : 0;
    };
    
    return {
      top: getInsetValue('env(safe-area-inset-top)') || (isIOS() ? 44 : 24),
      bottom: getInsetValue('env(safe-area-inset-bottom)') || (isIOS() ? 34 : 16),
      left: getInsetValue('env(safe-area-inset-left)') || 0,
      right: getInsetValue('env(safe-area-inset-right)') || 0
    };
  } catch (e) {
    // Fallback values
    return {
      top: isIOS() ? (hasNotch() ? 44 : 20) : 24,
      bottom: isIOS() ? (hasNotch() ? 34 : 0) : 16,
      left: 0,
      right: 0
    };
  }
}; 