import { type PropsWithChildren } from "react";
import clsx from "clsx";

type TextVariant =
  | "header1"
  | "header2"
  | "header3"
  | "body1"
  | "body2"
  | "caption"
  | "label"
  | "default";

interface TextProps {
  className?: string;
  variant?: TextVariant;
  weight?: "normal" | "medium" | "semibold" | "bold";
  color?: "primary" | "secondary" | "error" | "success" | "default";
}

const variantStyles: Record<TextVariant, string> = {
  header1: "text-4xl font-bold leading-tight",
  header2: "text-3xl font-semibold leading-tight",
  header3: "text-2xl font-semibold leading-snug",
  body1: "text-lg leading-relaxed",
  body2: "text-base leading-relaxed",
  caption: "text-sm leading-normal",
  label: "text-sm font-medium leading-none",
  default: "text-base leading-normal",
};

const weightStyles = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

// Separate base color styles from text color styles
const colorStyles = {
  primary: {
    base: "transition-colors duration-200",
    text: "text-blue-600 dark:text-blue-400",
  },
  secondary: {
    base: "transition-colors duration-200",
    text: "text-gray-600 dark:text-gray-300",
  },
  error: {
    base: "transition-colors duration-200",
    text: "text-red-600 dark:text-red-400",
  },
  success: {
    base: "transition-colors duration-200",
    text: "text-green-600 dark:text-green-400",
  },
  default: {
    base: "transition-colors duration-200",
    text: "text-gray-900 dark:text-white",
  },
};

export default function Text({
  children,
  className,
  variant = "default",
  weight,
  color = "default",
  ...props
}: PropsWithChildren<TextProps>) {
  // Extract any color-related classes from className
  const customClasses = className?.split(" ") || [];
  const hasCustomColor = customClasses.some(
    (cls) => cls.startsWith("text-") || cls.startsWith("dark:text-")
  );

  return (
    <p
      className={clsx(
        // Base styles
        colorStyles[color].base,
        variantStyles[variant],

        // Weight styles
        weight && weightStyles[weight],

        // Color styles - only apply if no custom color is provided
        !hasCustomColor && colorStyles[color].text,

        // Custom classes come last for other overrides
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

// Predefined Header components for convenience
Text.H1 = ({
  children,
  className,
  ...props
}: PropsWithChildren<Omit<TextProps, "variant">>) => (
  <Text variant="header1" className={className} {...props}>
    {children}
  </Text>
);

Text.H2 = ({
  children,
  className,
  ...props
}: PropsWithChildren<Omit<TextProps, "variant">>) => (
  <Text variant="header2" className={className} {...props}>
    {children}
  </Text>
);

Text.H3 = ({
  children,
  className,
  ...props
}: PropsWithChildren<Omit<TextProps, "variant">>) => (
  <Text variant="header3" className={className} {...props}>
    {children}
  </Text>
);

// Predefined Body components
Text.Body1 = ({
  children,
  className,
  ...props
}: PropsWithChildren<Omit<TextProps, "variant">>) => (
  <Text variant="body1" className={className} {...props}>
    {children}
  </Text>
);

Text.Body2 = ({
  children,
  className,
  ...props
}: PropsWithChildren<Omit<TextProps, "variant">>) => (
  <Text variant="body2" className={className} {...props}>
    {children}
  </Text>
);

// Utility components
Text.Caption = ({
  children,
  className,
  ...props
}: PropsWithChildren<Omit<TextProps, "variant">>) => (
  <Text variant="caption" className={className} {...props}>
    {children}
  </Text>
);

Text.Label = ({
  children,
  className,
  ...props
}: PropsWithChildren<Omit<TextProps, "variant">>) => (
  <Text variant="label" className={className} {...props}>
    {children}
  </Text>
);
