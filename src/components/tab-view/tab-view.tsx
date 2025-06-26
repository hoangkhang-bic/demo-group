import React, { useState, useRef, useEffect } from "react";
import View from "@components/View/View";

interface TabItem {
  key: string;
  title: string;
}

interface TabViewProps {
  tabs: TabItem[];
  initialTabKey?: string;
  className?: string;
  onTabChange?: (tab: string) => void;
  activeTab?: string;
  tabClassName?: string;
  activeTabClassName?: string;
}

export const TabView: React.FC<TabViewProps> = ({
  tabs,
  initialTabKey,
  className = "",
  onTabChange,
  activeTab: controlledActiveTab,
  tabClassName = "",
  activeTabClassName = "border-b-2 border-primary font-medium text-primary",
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(
    initialTabKey || tabs[0]?.key
  );
  const tabsRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLDivElement>(null);

  // Use controlled or uncontrolled active tab
  const activeTab = controlledActiveTab ?? internalActiveTab;

  // Scroll active tab into view
  useEffect(() => {
    if (activeTabRef.current && tabsRef.current) {
      const container = tabsRef.current;
      const element = activeTabRef.current;

      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      // Calculate the scroll position to center the element
      const scrollLeft =
        elementRect.left -
        containerRect.left -
        (containerRect.width - elementRect.width) / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [activeTab]);

  const handleTabClick = (tabKey: string) => {
    if (!controlledActiveTab) {
      setInternalActiveTab(tabKey);
    }
    onTabChange?.(tabKey);
  };

  return (
    <View
      className={`${className}`}
      style={{
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Horizontal Scrollable Tabs */}
      <div
        ref={tabsRef}
        className="flex overflow-x-auto hide-scrollbar "
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {tabs.map((tab) => (
          <div
            key={tab.key}
            ref={tab.key === activeTab ? activeTabRef : null}
            className={`flex-shrink-0 py-3 px-6 text-center cursor-pointer transition-all duration-200 whitespace-nowrap ${tabClassName} ${
              activeTab === tab.key
                ? activeTabClassName
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => handleTabClick(tab.key)}
          >
            <span className="text-sm">{tab.title}</span>
          </div>
        ))}
      </div>
    </View>
  );
};

// Add CSS to hide scrollbar but keep functionality
const styles = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// Add styles to document
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default TabView;
