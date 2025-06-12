# Technical Context

## Development Environment

### Required Tools

- Node.js (Latest LTS)
- VS Code with extensions:
  - Ionic
  - React
  - TypeScript
  - ESLint
- Platform-specific tools:
  - iOS: Xcode, CocoaPods
  - Android: Android Studio, JDK

### Project Configuration

Key configuration files:

- [package.json](mdc:package.json) - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Build configuration
- `capacitor.config.ts` - Native platform settings

## Dependencies

### Core Framework

```json
{
  "react": "^17.0.2",
  "react-dom": "^17.0.2",
  "@ionic/react": "^8.6.0",
  "@ionic/react-router": "^8.6.0"
}
```

### Native Integration

```json
{
  "@capacitor/core": "latest",
  "@capacitor/ios": "^7.3.0",
  "@capacitor/android": "^7.3.0",
  "@capacitor/camera": "latest",
  "@capacitor/splash-screen": "latest"
}
```

### Development Tools

```json
{
  "typescript": "^5.8.3",
  "vite": "^5.4.2",
  "@vitejs/plugin-react": "^4.5.2"
}
```

## Technical Constraints

1. Browser Compatibility

   - Modern browsers only
   - iOS Safari 13+
   - Android Chrome 6.0+

2. Device Requirements

   - iOS: iOS 13 or later
   - Android: Android 6.0 or later
   - Camera access required
   - Storage permissions needed

3. Build Requirements
   - Node.js environment
   - Platform-specific SDKs
   - Minimum 8GB RAM recommended
   - Git for version control

## Development Setup

1. Initial Setup

   ```bash
   npm install
   npx cap init
   ```

2. Platform Setup

   ```bash
   npm run build
   npx cap add ios
   npx cap add android
   ```

3. Development Workflow

   ```bash
   # Web development
   npm start

   # Native development
   npm run build
   npx cap sync
   npx cap open ios/android
   ```

## Security Considerations

1. Native Features

   - Camera permissions handling
   - Secure storage implementation
   - API key management
   - Data encryption when needed

2. Web Security
   - HTTPS for production
   - Content Security Policy
   - Secure data storage
   - Input validation

## Performance Guidelines

1. Bundle Optimization

   - Code splitting
   - Tree shaking
   - Asset optimization
   - Lazy loading

2. Runtime Performance
   - Virtual scroll for long lists
   - Image optimization
   - Memory management
   - Animation optimization
