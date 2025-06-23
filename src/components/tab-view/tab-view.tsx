import React, { useState, useRef, useEffect } from "react";
import View from "@components/View/View";

interface TabViewProps {
  tabs: {
    key: string;
    title: string;
    content: React.ReactNode;
  }[];
  initialTabKey?: string;
  className?: string;
}

export const TabView: React.FC<TabViewProps> = ({
  tabs,
  initialTabKey,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState(initialTabKey || tabs[0]?.key);
  const tabsRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLDivElement>(null);

  const activeContent = tabs.find((tab) => tab.key === activeTab)?.content;

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

  return (
    <View className={`flex flex-col h-full ${className}`}>
      {/* Tab Headers Container */}
      <View className="relative border-b">
        {/* Horizontal Scrollable Tabs */}
        <div
          ref={tabsRef}
          className="flex overflow-x-auto hide-scrollbar"
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
              className={`flex-shrink-0 py-3 px-6 text-center cursor-pointer transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.key
                  ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="text-sm">{tab.title}</span>
            </div>
          ))}
        </div>
      </View>

      {/* Tab Content */}
      <View className="flex-1 overflow-hidden">{activeContent}</View>
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
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default TabView;
