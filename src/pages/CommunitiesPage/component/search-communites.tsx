import React from "react";
import View from "@components/View/View";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Touchable } from "@components/touchable/touchable";
import SearchInput from "./search-input/search-input";

interface SearchCommunitiesProps {
  onSearch: (query: string) => void;
  searchResults?: any[];
}

const SearchCommunities: React.FC<SearchCommunitiesProps> = ({
  onSearch,
  searchResults = [],
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showResults, setShowResults] = React.useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = React.useState(false);

  const handleSearchChange = (e: any) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
    setShowResults(!!query);
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
          <SearchInput
            onSearch={handleSearchChange}
            searchResults={searchResults}
            onFocus={() => setIsSearchExpanded(true)}
            onBlur={() => setIsSearchExpanded(false)}
          />
        )}
        <ActionButtons
          toggleSearch={toggleSearch}
          isShowSearch={isSearchExpanded}
        />
      </View>

      {/* Search Results */}
    </View>
  );
};

const ActionButtons = ({
  toggleSearch,
  isShowSearch,
}: {
  toggleSearch: () => void;
  isShowSearch: boolean;
}) => {
  const navigate = useNavigate();

  const handleCreateCommunity = () => {
    navigate("/create-community");
  };

  return (
    <View
      justifyContent="center"
      alignItems="center"
      flexDirection="row"
      paddingHorizontal={8}
      gap={10}
    >
      {!isShowSearch && (
        <Touchable activeOpacity={0.7} onPress={toggleSearch}>
          <FaSearch className="text-[#494949] text-sm" size={16} />
        </Touchable>
      )}
      <Touchable activeOpacity={0.7} onPress={handleCreateCommunity}>
        <View
          borderRadius={9999}
          padding={10}
          backgroundColor="#ECECEC"
          justifyContent="center"
          alignItems="center"
        >
          <FaPlus className="text-[#6F32BB] text-sm" />
        </View>
      </Touchable>
    </View>
  );
};
export default SearchCommunities;
