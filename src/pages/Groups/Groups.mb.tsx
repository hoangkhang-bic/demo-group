import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import View from "@/components/View/View";
import PageAndroidTransition from "@/components/wrapper-transistion/page.android.transition";
import MbHeader from "@/components/bic-components/mb-header/mb-header";
import TabView from "@/components/tab-view/tab-view";
import VirtualList from "@/components/virtual-list/virtual-list";
import { GroupItem } from "./components/group-item";
import { useGroups } from "@/services/group-services";
import { IoAdd } from "react-icons/io5";
import { useGetBottomTabInset } from "@/hooks/useSafeAreaInsets";

const tabs = [
  {
    key: "all-groups",
    title: "All Groups",
  },
  {
    key: "my-groups",
    title: "My Groups",
  },
  {
    key: "discover",
    title: "Discover",
  },
];

const GroupsPage: React.FC = () => {
  const navigate = useNavigate();
  const { communityId } = useParams();
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const insetBottom = useGetBottomTabInset();

  const { data: groups, isLoading } = useGroups(communityId);

  const handleGroupClick = (groupId: string) => {
    navigate(`/groups/${groupId}`);
  };

  const handleCreateGroup = () => {
    navigate("/create-group");
  };

  const renderContent = useMemo(() => {
    if (isLoading || !groups) {
      return (
        <View flex={1} justifyContent="center" alignItems="center">
          <span>Loading...</span>
        </View>
      );
    }

    return (
      <VirtualList
        data={groups}
        renderItem={({ item }) => (
          <GroupItem group={item} onClick={() => handleGroupClick(item.id)} />
        )}
        keyExtractor={(item) => item.id}
        rowSpacing={12}
      />
    );
  }, [groups, isLoading]);

  return (
    <PageAndroidTransition
      disableTransition={true}
      style={{
        paddingBottom: insetBottom,
      }}
    >
      <View className="flex flex-col h-full">
        <MbHeader
          title="Groups"
          rightComponent={
            <button
              onClick={handleCreateGroup}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-primary"
            >
              <IoAdd size={24} color="white" />
            </button>
          }
        />

        <TabView
          tabs={tabs}
          onTabChange={(tab) => setActiveTab(tab)}
          initialTabKey="all-groups"
        />

        <View padding={16} className="flex-1 overflow-y-auto">
          {renderContent}
        </View>
      </View>
    </PageAndroidTransition>
  );
};

export default GroupsPage;
