import View from "@components/View/View";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useIsMobile } from "@hooks/useMediaQuery";

interface SearchInputProps {
  onSearch: (query: any) => void;
  searchResults?: any;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function SearchInput({
  onSearch,
  searchResults,
  onFocus,
  onBlur,
}: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  const [isFocus, setIsFocus] = useState(false);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const onFocusInput = () => {
    onFocus?.();
    setIsFocus(true);
  };
  const onBlurInput = () => {
    onBlur?.();
    setIsFocus(false);
  };
  return (
    <View
      flexDirection="row"
      alignItems="center"
      flex={1}
      borderRadius={10}
      borderWidth={0.5}
      padding={10}
      backgroundColor={isFocus ? "#FCFCFCFF" : "transparent"}
      borderColor={isFocus ? "#6F32BB" : "#E1E1E1FF"}
    >
      <View position="relative" paddingHorizontal={10}>
        <FaSearch className="text-[#494949] text-sm" size={16} />
      </View>
      <input
        type="text"
        value={searchQuery}
        onFocus={onFocusInput}
        onBlur={onBlurInput}
        onChange={handleSearchChange}
        placeholder="Search communities..."
        className="search-input"
        autoFocus={isMobile}
      />
    </View>
  );
}
