import React, { useState } from "react";
import ListCommunities from "./component/list-communities";
import { mockCommunitiesList } from "@services/mock-communities-list";
import { Community } from "./component/list-communities";
import PageAndroidTransition from "@/components/wrapper-transistion/page.android.transition";
import View from "@/components/View/View";
import TabView from "@components/tab-view/tab-view";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SearchCommunities from "./component/search-communites";

const tabs = [
  {
    key: "all",
    title: "All",
    content: <ListCommunities sections={mockCommunitiesList} />,
  },
  {
    key: "my-communities-1",
    title: "My Communities",
    content: <ListCommunities sections={mockCommunitiesList} />,
  },
  {
    key: "my-communities-2",
    title: "My Communities",
    content: <ListCommunities sections={mockCommunitiesList} />,
  },
  {
    key: "my-communities-3",
    title: "My Communities",
    content: <ListCommunities sections={mockCommunitiesList} />,
  },
];

const Communities: React.FC = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<Community[]>([]);

  const handleSelectCommunity = (community: Community) => {
    console.log("Selected community:", community);
  };

  const handleCreateCommunity = () => {
    navigate("/create-community");
  };

  const handleSearch = (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    // Search through all communities in all sections
    const allCommunities = mockCommunitiesList.flatMap(
      (section) => section.communities
    );
    const filtered = allCommunities.filter((community) =>
      community.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  return (
    <PageAndroidTransition disableTransition={true}>
      <View className="flex flex-col h-full">
        {/* Header with Search and Create Button */}
        <SearchCommunities
          onSearch={handleSearch}
          searchResults={searchResults}
        />
        {/* Tab View */}
        <View className="flex-1">
          <TabView tabs={tabs} />
        </View>
      </View>
    </PageAndroidTransition>
  );
};

export default Communities;
