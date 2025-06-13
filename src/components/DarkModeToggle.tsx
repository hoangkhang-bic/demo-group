import React, { useState, useEffect } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { moon, sunny } from "ionicons/icons";

interface DarkModeToggleProps {
  className?: string;
  slot?: string;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  className = "",
  slot,
}) => {
  // Initialize dark mode based on system preference or stored value
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check for stored preference
    const storedPreference = localStorage.getItem("darkMode");
    if (storedPreference !== null) {
      return storedPreference === "true";
    }

    // Check for system preference
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  // Apply dark mode class to document when component mounts or state changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
    }

    // Store preference
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't explicitly set a preference
      if (localStorage.getItem("darkMode") === null) {
        setIsDarkMode(e.matches);
      }
    };

    // Add listener for preference changes
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <IonButton
      fill="clear"
      className={`dark-mode-toggle ${className}`}
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      slot={slot}
    >
      <IonIcon
        icon={isDarkMode ? sunny : moon}
        slot="icon-only"
        className="dark-mode-toggle-icon"
      />
    </IonButton>
  );
};

export default DarkModeToggle;
