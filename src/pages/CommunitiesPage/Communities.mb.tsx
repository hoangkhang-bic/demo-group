import React, { useMemo, useState } from "react";
import ListCommunities from "./component/list-communities";

import PageAndroidTransition from "@/components/wrapper-transistion/page.android.transition";
import View from "@/components/View/View";
import TabView from "@components/tab-view/tab-view";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SearchCommunities from "./component/search-communites";
import { useGetBottomTabInset } from "@/hooks/useSafeAreaInsets";
const tabs = [
  {
    key: "your-communities",
    title: "Your Communities",
  },
  {
    key: "your-managed-communities",
    title: "Your Managed",
  },
  {
    key: "your-groups",
    title: "Your Groups",
  },
  {
    key: "discover-1",
    title: "Discovery",
  },
];

const Communities: React.FC = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const insetBottom = useGetBottomTabInset();
  console.log("insetBottom", insetBottom);

  const handleSelectCommunity = (community: any) => {
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
  };

  const renderContent = useMemo(() => {
    switch (activeTab) {
      case "your-communities":
        return <YourCommunities />;
      case "your-managed-communities":
        return <YourManagedCommunities />;
      case "your-groups":
        return <YourGroups />;
      case "discover-1":
        return <Discovery />;
    }
  }, [activeTab]);
  return (
    <PageAndroidTransition
      disableTransition={true}
      style={{
        paddingBottom: insetBottom,
      }}
    >
      <View className="flex flex-col h-full">
        {/* Header with Search and Create Button */}
        <SearchCommunities
          onSearch={handleSearch}
          searchResults={searchResults}
        />
        <TabView
          tabs={tabs}
          onTabChange={(tab) => setActiveTab(tab)}
          initialTabKey="your-communities"
        />
        <View padding={10} className="flex-1 overflow-y-auto">
          {renderContent}
        </View>
      </View>
    </PageAndroidTransition>
  );
};

const YourCommunities = () => {
  return <ListCommunities />;
};

const YourManagedCommunities = () => {
  return <></>;
};

const YourGroups = () => {
  return <div>Your Groups</div>;
};

const Discovery = () => {
  return <div>Discovery</div>;
};

export default Communities;
