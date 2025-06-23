import React from "react";
import View from "@components/View/View";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Community } from "./list-communities";
import { useNavigate } from "react-router-dom";
import { Touchable } from "@components/touchable/touchable";

interface SearchCommunitiesProps {
  onSearch: (query: string) => void;
  searchResults?: Community[];
}

const SearchCommunities: React.FC<SearchCommunitiesProps> = ({
  onSearch,
  searchResults = [],
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showResults, setShowResults] = React.useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = React.useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
    setShowResults(!!query);
  };

  const handleCreateCommunity = () => {
    navigate("/create-community");
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setSearchQuery("");
      setShowResults(false);
    }
  };

  return (
    <View className="px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-10">
      <View flexDirection="row" justifyContent="space-between">
        {/* Title when search is not expanded */}
        {!isSearchExpanded && (
          <span className="text-[16px] font-semibold text-[#171717]">
            Communities
          </span>
        )}

        {/* Search Input when expanded */}
        {isSearchExpanded && (
          <View className="flex-1 relative mr-2">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#494949] text-sm" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search communities..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6F32BB] focus:bg-white transition-all"
              autoFocus
            />
          </View>
        )}

        {/* Action Buttons */}
        <View className="flex items-center gap-2">
          {/* Search Toggle Button */}
          <button
            onClick={toggleSearch}
            className="flex items-center justify-center w-8 h-8 bg-white hover:bg-[#ECECEC] rounded-xl transition-colors"
          >
            <FaSearch className="text-[#494949] text-sm" />
          </button>

          {/* Create Button */}
          <Touchable activeOpacity={0.7} onPress={handleCreateCommunity}>
            <View className="w-">
              <FaPlus className="text-[#6F32BB] text-sm" />
            </View>
          </Touchable>
        </View>
      </View>

      {/* Search Results */}
    </View>
  );
};

export default SearchCommunities;
