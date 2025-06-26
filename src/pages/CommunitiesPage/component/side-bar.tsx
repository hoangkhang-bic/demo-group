import React from "react";
import { useNavigate } from "react-router-dom";
import SearchCommunities from "./search-communites";

interface SideBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchResults: any[];
  handleSearch: (query: string) => void;
}

const tabs = [
  {
    key: "your-communities",
    title: "Yours",
  },
  {
    key: "discover",
    title: "Discover",
  },
  {
    key: "pending-request",
    title: "Pending request",
  },
];

const SideBar: React.FC<SideBarProps> = ({
  activeTab,
  setActiveTab,
  searchResults,
  handleSearch,
}) => {
  const navigate = useNavigate();

  const handleCreateCommunity = () => {
    navigate("/create-community");
  };

  return (
    <div
      className="w-80 bg-white shadow-sm border-r border-gray-200 fixed left-0 h-[calc(100vh-var(--top-header-height))] flex flex-col"
      style={{ top: "var(--top-header-height)" }}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <SearchCommunities
          onSearch={handleSearch}
          searchResults={searchResults}
        />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Sidebar Navigation */}
        <div className="p-4">
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === tab.key
                    ? "bg-purple-50 text-purple-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="w-5 h-5">
                  {tab.key === "your-communities" && (
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {tab.key === "discover" && (
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {tab.key === "pending-request" && (
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                {tab.title}
              </button>
            ))}
          </div>

          {/* Create Community Button */}
          <button
            onClick={handleCreateCommunity}
            className="w-full mt-4 flex items-center gap-3 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create new community
          </button>
        </div>

        {/* Premium Banner */}
        <div className="m-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Get Premium to double your Medals
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Your chance to double your Medals and get special benefits from
              premium features.
            </p>
            <button className="w-full px-4 py-2 bg-white text-purple-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
