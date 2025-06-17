        /** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
            theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          shade: "var(--color-primary-shade)",
          tint: "var(--color-primary-tint)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          shade: "var(--color-secondary-shade)",
          tint: "var(--color-secondary-tint)",
        },
        success: {
          DEFAULT: "var(--color-success)",
          shade: "var(--color-success-shade)",
          tint: "var(--color-success-tint)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          shade: "var(--color-warning-shade)",
          tint: "var(--color-warning-tint)",
        },
        danger: {
          DEFAULT: "var(--color-danger)",
          shade: "var(--color-danger-shade)",
          tint: "var(--color-danger-tint)",
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Open Sans", "Helvetica Neue", "sans-serif"],
      },
      spacing: {
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
        "2xl": "var(--spacing-2xl)",
      },
      borderRadius: {
        DEFAULT: "8px",
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        DEFAULT: "0 2px 8px rgba(0, 0, 0, 0.1)",
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
        xl: "0 20px 25px rgba(0, 0, 0, 0.15)",
      },
    },
            },
            plugins: [],
          };