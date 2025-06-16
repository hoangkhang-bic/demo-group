# SafeAreaView Component

A responsive component that handles safe area insets for iOS and Android devices, ensuring your content is properly displayed on devices with notches, home indicators, and system navigation bars.

## Features

- Automatically detects iOS and Android platforms
- Supports all safe area insets (top, bottom, left, right)
- Handles device orientation changes
- Provides fallbacks for devices without CSS environment variable support
- Customizable insets with `forceInset` option
- Fully responsive across different devices and orientations

## Installation

No additional installation required. The component is part of your project.

## Usage

```tsx
import SafeAreaView from "@/components/seft-area-view/seft-area-view";

// Basic usage with all insets
const App = () => (
  <SafeAreaView>
    <YourContent />
  </SafeAreaView>
);

// Only apply top and bottom insets
const TopBottomSafeArea = () => (
  <SafeAreaView top bottom left={false} right={false}>
    <YourContent />
  </SafeAreaView>
);

// Force specific insets
const CustomInsets = () => (
  <SafeAreaView
    forceInset={{
      top: "always", // Always apply top inset
      bottom: 20, // Force 20px bottom inset
      left: "never", // Never apply left inset
    }}
  >
    <YourContent />
  </SafeAreaView>
);

// With custom styles
const StyledSafeArea = () => (
  <SafeAreaView
    style={{ backgroundColor: "#f5f5f5" }}
    className="my-custom-class"
  >
    <YourContent />
  </SafeAreaView>
);
```

## Props

| Prop         | Type                | Default     | Description                                 |
| ------------ | ------------------- | ----------- | ------------------------------------------- |
| `children`   | ReactNode           | required    | Content to render inside the safe area      |
| `top`        | boolean             | `true`      | Whether to apply top safe area inset        |
| `bottom`     | boolean             | `true`      | Whether to apply bottom safe area inset     |
| `left`       | boolean             | `true`      | Whether to apply left safe area inset       |
| `right`      | boolean             | `true`      | Whether to apply right safe area inset      |
| `style`      | React.CSSProperties | `{}`        | Additional styles to apply to the container |
| `className`  | string              | `''`        | Additional CSS class names                  |
| `forceInset` | object              | `undefined` | Force specific insets (see below)           |

### forceInset Options

The `forceInset` prop allows you to override the default safe area behavior:

```tsx
forceInset: {
  top?: 'always' | 'never' | number;
  bottom?: 'always' | 'never' | number;
  left?: 'always' | 'never' | number;
  right?: 'always' | 'never' | number;
}
```

- `'always'`: Always apply the inset, even if the device doesn't have a notch/home indicator
- `'never'`: Never apply the inset, even if the device has a notch/home indicator
- `number`: Apply a specific pixel value for the inset

## Common Use Cases

### Full-screen App Layout

```tsx
const AppLayout = () => (
  <SafeAreaView style={{ height: "100vh" }}>
    <Header />
    <div className="safe-area-view__content">
      {/* Main scrollable content */}
      <MainContent />
    </div>
    <Footer />
  </SafeAreaView>
);
```

### Bottom Sheet with Safe Area

```tsx
const BottomSheet = () => (
  <div className="bottom-sheet">
    <SafeAreaView top={false} left={false} right={false}>
      <div className="bottom-sheet-content">{/* Bottom sheet content */}</div>
    </SafeAreaView>
  </div>
);
```

### Modal with Safe Areas

```tsx
const Modal = () => (
  <div className="modal-overlay">
    <SafeAreaView className="modal-container">
      <div className="modal-content">{/* Modal content */}</div>
    </SafeAreaView>
  </div>
);
```

## Platform Detection

The component automatically detects the platform (iOS, Android, or web) and applies appropriate styles. You can use the platform-specific CSS classes for custom styling:

```css
/* iOS-specific styles */
.safe-area-view--platform-ios .my-component {
  /* iOS-specific styles */
}

/* Android-specific styles */
.safe-area-view--platform-android .my-component {
  /* Android-specific styles */
}
```

## Notes

- The component uses CSS environment variables (`env(safe-area-inset-*)`) when available
- Fallback values are provided for devices that don't support CSS environment variables
- On iOS, the component handles notch and home indicator spacing
- On Android, the component handles status bar and navigation bar spacing
