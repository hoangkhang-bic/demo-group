import React, { useEffect, useRef } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import HeaderBar from "@/components/header-bar/header-bar";
import View from "@/components/View/View";

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
  const animationClass = isIOS
    ? "animate-ios-header-in"
    : "animate-android-header-in";

  const headerClasses = `
    relative w-full z-[1000]
    ${transparent ? "bg-transparent border-b-0" : ""}
    ${fixed ? "fixed top-0 left-0 right-0" : ""}
    ${className}
  `.trim();

  const containerClasses = `
    flex items-center justify-between w-full relative
    min-h-[48px] md:min-h-[56px] lg:min-h-[64px]
    ${animationClass}
  `.trim();

  const backButtonClasses = `
    flex items-center justify-center w-8 h-8 rounded-full cursor-pointer mr-2
    transition-colors duration-200 ease-in-out
    hover:bg-gray-100 active:bg-gray-200
  `.trim();

  const backIconClasses = `
    text-2xl text-gray-900
    ${isIOS ? "-ml-1" : "ml-0"}
  `.trim();

  const titleClasses = `
    flex-1 flex items-center justify-center overflow-hidden
    absolute inset-0 pointer-events-none
  `.trim();

  const titleTextClasses = `
    m-0 text-base font-semibold whitespace-nowrap overflow-hidden text-ellipsis text-gray-900
    md:text-lg
  `.trim();

  return (
    <HeaderBar
      className={headerClasses}
      style={style}
      showShadow={!transparent}
      iosShadow={!transparent}
      androidElevation={transparent ? 0 : 2}
    >
      <div ref={headerRef} className={containerClasses}>
        {showBackButton && (
          <div
            className={backButtonClasses}
            onClick={handleBackClick}
            role="button"
            aria-label="Back"
          >
            <IoChevronBackOutline className={backIconClasses} />
          </div>
        )}

        {title && (
          <div className={titleClasses}>
            <h1 className={titleTextClasses}>{title}</h1>
          </div>
        )}

        {rightComponent && (
          <div className="flex items-center justify-end ml-2">
            {rightComponent}
          </div>
        )}
      </div>
    </HeaderBar>
  );
}
