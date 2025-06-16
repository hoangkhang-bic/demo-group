import React, { useEffect, useRef } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import HeaderBar from "@/components/header-bar/header-bar";
import View from "@/components/View/View";
import "./mb-header.css";

interface MbHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  rightComponent?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  transparent?: boolean;
  fixed?: boolean;
}

export default function MbHeader({
  title,
  showBackButton = true,
  onBackClick,
  rightComponent,
  className = "",
  style,
  transparent = false,
  fixed = false,
}: MbHeaderProps) {
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement>(null);
  const isAndroid = useMediaQuery({ query: "(platform: android)" });
  const isIOS = useMediaQuery({ query: "(platform: ios)" });

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  // Apply platform-specific animations
  useEffect(() => {
    if (!headerRef.current) return;

    if (isIOS) {
      headerRef.current.classList.add("mb-header--ios");
    } else if (isAndroid) {
      headerRef.current.classList.add("mb-header--android");
    }

    // Add entrance animation
    headerRef.current.classList.add("mb-header--animate-in");
  }, [isIOS, isAndroid]);

  return (
    <HeaderBar
      className={`mb-header ${transparent ? "mb-header--transparent" : ""} ${
        fixed ? "mb-header--fixed" : ""
      } ${className}`}
      style={style}
      showShadow={!transparent}
      iosShadow={!transparent}
      androidElevation={transparent ? 0 : 2}
    >
      <div ref={headerRef} className="mb-header__container">
        {showBackButton && (
          <div
            className="mb-header__back-button"
            onClick={handleBackClick}
            role="button"
            aria-label="Back"
          >
            <IoChevronBackOutline
              className={`mb-header__back-icon ${
                isIOS
                  ? "mb-header__back-icon--ios"
                  : "mb-header__back-icon--android"
              }`}
            />
          </div>
        )}

        {title && (
          <div className="mb-header__title">
            <h1 className="mb-header__title-text">{title}</h1>
          </div>
        )}

        {rightComponent && (
          <div className="mb-header__right">{rightComponent}</div>
        )}
      </div>
    </HeaderBar>
  );
}
