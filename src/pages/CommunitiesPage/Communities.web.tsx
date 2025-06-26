import React, { useMemo, useState, useCallback } from "react";
import ListCommunities from "./component/list-communities";
import View from "@/components/View/View";
import TabView from "@components/tab-view/tab-view";
import { useNavigate } from "react-router-dom";
import SearchCommunities from "./component/search-communites";
import {
  useCommunitiesData,
  useCommunitiesStore,
  useUserCommunitiesData,
} from "@/store/communitiesStore";
import { Group, SubGroup } from "@services/communities-services";
import SideBar from "./component/side-bar";
import { TopHeaderWeb } from "../TopHeader";

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

// Extended interface for pending requests
interface PendingCommunity extends Group {
  status: "requested" | "invite";
  parentCommunity?: string;
  contentPerWeek?: string;
}

interface PendingGroup {
  id: string;
  name: string;
  parentCommunity: string;
  members: string;
  type: "group";
  status: "requested" | "invite";
  avatar?: string;
}

const CommunitiesWeb: React.FC = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("pending-request");
  const [activeFilter, setActiveFilter] = useState("received");

  // Use real data from communities services
  const { communities, isLoading: isLoadingCommunities } =
    useCommunitiesData(20);

  const handleSelectCommunity = useCallback((community: any) => {
    console.log("Selected community:", community);
  }, []);

  const handleCreateCommunity = useCallback(() => {
    navigate("/create-community");
  }, [navigate]);

  const handleSearch = useCallback((query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    // Web-specific search logic can be added here
  }, []);

  // Transform communities data to simulate pending requests
  const pendingRequestsData = useMemo(() => {
    if (!communities || communities.length === 0 || isLoadingCommunities) {
      return { communities: [], groups: [] };
    }

    // Create mock pending communities from real data
    const mockPendingCommunities: PendingCommunity[] = communities
      .slice(0, 6)
      .map((community, index) => ({
        ...community,
        status:
          index % 3 === 0 ? "invite" : ("requested" as "requested" | "invite"),
        contentPerWeek: `${Math.floor(Math.random() * 50) + 10}k`,
      }));

    // Create mock pending groups from real community data
    const mockPendingGroups: PendingGroup[] = communities
      .slice(0, 8)
      .flatMap(
        (community, communityIndex) =>
          community.subGroups
            ?.slice(0, 2)
            .map((subGroup: SubGroup, groupIndex: number) => ({
              id: `${subGroup.id}-pending`,
              name: subGroup.name,
              parentCommunity: community.name,
              members: `${subGroup.memberCount}`,
              type: "group" as const,
              status:
                (communityIndex + groupIndex) % 2 === 0
                  ? "invite"
                  : ("requested" as "requested" | "invite"),
              avatar: `https://picsum.photos/48/48?random=${
                communityIndex + groupIndex
              }`,
            })) || []
      )
      .slice(0, 6);

    return {
      communities: mockPendingCommunities,
      groups: mockPendingGroups,
    };
  }, [communities, isLoadingCommunities]);

  const renderContent = useMemo(() => {
    switch (activeTab) {
      case "your-communities":
        return <YourCommunities />;
      case "discover":
        return <Discovery />;
      case "pending-request":
        return (
          <PendingRequests
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            pendingData={pendingRequestsData}
            isLoading={isLoadingCommunities}
          />
        );
      default:
        return <YourCommunities />;
    }
  }, [
    activeTab,
    activeFilter,
    pendingRequestsData,
    isLoadingCommunities,
    setActiveFilter,
  ]);

  return (
    <View flex={1} className="h-screen overflow-hidden">
      {/* Fixed Header */}
      <View className="fixed top-0 left-0 right-0 z-50 min-w-full">
        <TopHeaderWeb />
      </View>

      {/* Main Content Area */}
      <View
        backgroundColor="red"
        className="h-[calc(100vh-var(--top-header-height-desktop))] mt-[var(--top-header-height-desktop)]"
      >
        <div className="h-full bg-gray-50 flex">
          <SideBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchResults={searchResults}
            handleSearch={handleSearch}
          />

          {/* Main Content */}
          <div className="flex-1 ml-80 overflow-y-auto">
            <View padding={24}>{renderContent}</View>
          </div>
        </div>
      </View>
    </View>
  );
};

const YourCommunities = () => {
  const { communities } = useCommunitiesStore();
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Your Communities</h2>
      <View flex={1}>
        <div className="grid grid-cols-2 gap-6">
          {communities.map((community) => (
            <CommunityCard key={community.id} community={community as any} />
          ))}
        </div>
      </View>
    </div>
  );
};

const Discovery = () => {
  const { communities } = useCommunitiesStore();
  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Discover Communities
        </h3>
        <p className="text-gray-500">
          Find new communities to join and connect with people who share your
          interests.
        </p>
      </div>
      {/* Placeholder for discovery content */}
      <div className="grid grid-cols-2 gap-6">
        {/* Discovery content will be added here */}
        {communities.map((community) => (
          <CommunityCard key={community.id} community={community as any} />
        ))}
      </div>
    </div>
  );
};

interface PendingRequestsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  pendingData: {
    communities: PendingCommunity[];
    groups: PendingGroup[];
  };
  isLoading: boolean;
}

const PendingRequests: React.FC<PendingRequestsProps> = ({
  activeFilter,
  onFilterChange,
  pendingData,
  isLoading,
}) => {
  const filteredCommunities =
    activeFilter === "received"
      ? pendingData.communities.filter((c) => c.status === "invite")
      : pendingData.communities.filter((c) => c.status === "requested");

  const filteredGroups =
    activeFilter === "received"
      ? pendingData.groups.filter((g) => g.status === "invite")
      : pendingData.groups.filter((g) => g.status === "requested");

  const totalPending =
    pendingData.communities.length + pendingData.groups.length;
  const totalReceived =
    pendingData.communities.filter((c) => c.status === "invite").length +
    pendingData.groups.filter((g) => g.status === "invite").length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Pending request</h2>
        <span className="text-lg text-gray-600">({totalPending})</span>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-3">
        <button
          onClick={() => onFilterChange("received")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === "received"
              ? "bg-purple-100 text-purple-700 border border-purple-200"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Received {totalReceived}
        </button>
        <button
          onClick={() => onFilterChange("sent")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === "sent"
              ? "bg-purple-100 text-purple-700 border border-purple-200"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Sent
        </button>
      </div>

      {/* Communities Section */}
      {filteredCommunities.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Communities</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredCommunities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        </div>
      )}

      {/* Groups Section */}
      {filteredGroups.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Groups</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredCommunities.length === 0 && filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No {activeFilter} requests
          </h3>
          <p className="text-gray-500">
            {activeFilter === "received"
              ? "You don't have any pending invitations at the moment."
              : "You haven't sent any requests that are still pending."}
          </p>
        </div>
      )}
    </div>
  );
};

const CommunityCard: React.FC<{ community: PendingCommunity }> = ({
  community,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header Image */}
      <div className="h-20 bg-gradient-to-r from-purple-100 to-pink-100 relative">
        <div className="absolute -bottom-6 left-3">
          <div
            className="w-12 h-12 rounded-xl border-2 border-white flex items-center justify-center text-xl"
            style={{ backgroundColor: community.color }}
          >
            {community.icon}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pt-8">
        <h4 className="font-semibold text-gray-900 mb-2">{community.name}</h4>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            {community.memberCount}
          </div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <span>{community.contentPerWeek} contents/week</span>
        </div>

        {community.status === "requested" ? (
          <button className="w-full px-4 py-2 text-purple-700 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            Cancel Request
          </button>
        ) : (
          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Accept
            </button>
            <button className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Decline
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const GroupCard: React.FC<{ group: PendingGroup }> = ({ group }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header Image */}
      <div className="h-20 bg-gradient-to-r from-blue-100 to-indigo-100 relative">
        <div className="absolute -bottom-6 left-3">
          <img
            src={
              group.avatar || `https://picsum.photos/48/48?random=${group.id}`
            }
            alt={group.name}
            className="w-12 h-12 rounded-xl border-2 border-white"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pt-8">
        <div className="mb-2">
          <span className="text-sm text-purple-600 font-medium">
            {group.parentCommunity}
          </span>
          <h4 className="font-semibold text-gray-900">{group.name}</h4>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          {group.members}
        </div>

        {group.status === "requested" ? (
          <button className="w-full px-4 py-2 text-purple-700 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            Cancel Request
          </button>
        ) : (
          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Accept
            </button>
            <button className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Decline
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunitiesWeb;
