import React from "react";
import View from "../../components/View/View";
import Avatar from "../../components/Image/avatar";
import { Touchable } from "../../components/touchable/touchable";
import { FaSearch, FaPlus, FaCheck, FaMapPin } from "react-icons/fa";
import { useGetTopHeaderInset } from "../../hooks/useSafeAreaInsets";
import { useNavigate } from "react-router";
import { Group } from "@/services/group-services";

interface Community {
  id: string;
  name: string;
  avatarUrl?: string;
  isVerified?: boolean;
  isPinned?: boolean;
  notificationCount?: number;
  groups?: Group[];
}

interface CommunitiesSidebarProps {
  communities?: Community[];
  onSearch?: () => void;
  onCreateCommunity?: () => void;
  onCommunitySelect?: (community: Community) => void;
  title?: string;
}

const CommunitiesSidebar: React.FC<CommunitiesSidebarProps> = ({
  communities = [],
  onSearch,
  onCreateCommunity,
  onCommunitySelect,
  title = "Your communities",
}) => {
  const navigate = useNavigate();
  return (
    <View
      className="w-[300px] h-screen  border-gray-200 bg-white flex flex-col overflow-hidden"
      borderColor="var(--border-color)"
      borderWidth={1}
      borderRadius={12}
    >
      {/* Header */}
      <View className="p-4 border-b border-gray-200 bg-white flex-shrink-0">
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <span className="text-base font-semibold text-gray-900 leading-6">
            {title}
          </span>
          <View flexDirection="row" className="gap-3" alignItems="center">
            <Touchable onPress={onSearch}>
              <View className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors duration-200">
                <FaSearch size={16} className="text-gray-500" />
              </View>
            </Touchable>
            <Touchable onPress={() => navigate("/create-community")}>
              <View className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors duration-200">
                <FaPlus size={16} className="text-gray-500" />
              </View>
            </Touchable>
          </View>
        </View>
      </View>

      {/* Communities List */}
      <View className="flex-1 p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
        {communities.map((community) => (
          <CommunityListItem
            key={community.id}
            community={community}
            onPress={() => navigate(`/communities/${community?.id}`)}
          />
        ))}
      </View>
    </View>
  );
};

interface CommunityListItemProps {
  community: Community;
  onPress?: () => void;
}

const CommunityListItem: React.FC<CommunityListItemProps> = ({
  community,
  onPress,
}) => {
  const { name, avatarUrl, isVerified, isPinned, notificationCount } =
    community;

  return (
    <Touchable onPress={onPress}>
      <View className="p-2 rounded-lg mb-1 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
        <View flexDirection="row" alignItems="center" className="gap-3">
          {/* Avatar */}
          <View className="relative">
            <Avatar
              source={avatarUrl || "https://via.placeholder.com/40"}
              size="md"
              variant="circle"
              alt={`${name} avatar`}
            />
            {/* Verification Badge */}
            {isVerified && (
              <View className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                <FaCheck size={8} className="text-white" />
              </View>
            )}
          </View>

          {/* Content */}
          <View className="flex-1 min-w-0">
            <View flexDirection="row" alignItems="center" className="gap-1.5">
              <span className="text-sm font-medium text-gray-700 truncate max-w-[180px] leading-5">
                {name}
              </span>
              {isPinned && (
                <FaMapPin
                  size={12}
                  className="text-gray-500 flex-shrink-0 mt-0.5"
                />
              )}
            </View>
          </View>

          {/* Notification Badge */}
          {notificationCount && notificationCount > 0 && (
            <View className="bg-red-500 text-white rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5 flex-shrink-0">
              <span className="text-xs font-semibold leading-none">
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
            </View>
          )}
        </View>
      </View>
    </Touchable>
  );
};

// Mock data matching the image
const mockCommunities: Community[] = [
  {
    id: "1",
    name: "XÔM NGHÈO",
    avatarUrl: "https://via.placeholder.com/40/6366f1/ffffff?text=XN",
    isVerified: true,
  },
  {
    id: "2",
    name: "Community test Leave UC",
    avatarUrl: "https://via.placeholder.com/40/8b5cf6/ffffff?text=CT",
    isPinned: true,
  },
  {
    id: "3",
    name: "EVOL 50000000",
    avatarUrl: "https://via.placeholder.com/40/06b6d4/ffffff?text=E5",
    isPinned: true,
  },
  {
    id: "4",
    name: "666555",
    avatarUrl: "https://via.placeholder.com/40/f59e0b/ffffff?text=66",
    isPinned: true,
  },
  {
    id: "5",
    name: "trang 1",
    avatarUrl: "https://via.placeholder.com/40/10b981/ffffff?text=T1",
    isPinned: true,
  },
  {
    id: "6",
    name: "Ngọc Cường Năm Lâm",
    avatarUrl: "https://via.placeholder.com/40/ef4444/ffffff?text=NC",
  },
  {
    id: "7",
    name: "evol 36",
    avatarUrl: "https://via.placeholder.com/40/8b5cf6/ffffff?text=E3",
  },
  {
    id: "8",
    name: "evol 1519",
    avatarUrl: "https://via.placeholder.com/40/06b6d4/ffffff?text=E1",
  },
  {
    id: "9",
    name: "evol 33",
    avatarUrl: "https://via.placeholder.com/40/f59e0b/ffffff?text=E3",
  },
  {
    id: "10",
    name: "evol 31",
    avatarUrl: "https://via.placeholder.com/40/10b981/ffffff?text=E3",
  },
  {
    id: "11",
    name: "EVOL 28",
    avatarUrl: "https://via.placeholder.com/40/ef4444/ffffff?text=E2",
  },
  {
    id: "12",
    name: "EVOL 27",
    avatarUrl: "https://via.placeholder.com/40/6366f1/ffffff?text=E2",
  },
  {
    id: "13",
    name: "EVOL 26",
    avatarUrl: "https://via.placeholder.com/40/8b5cf6/ffffff?text=E2",
  },
  {
    id: "14",
    name: "EVOL 25",
    avatarUrl: "https://via.placeholder.com/40/06b6d4/ffffff?text=E2",
  },
  {
    id: "15",
    name: "EVOL 24",
    avatarUrl: "https://via.placeholder.com/40/f59e0b/ffffff?text=E2",
  },
  {
    id: "16",
    name: "EVOL 23",
    avatarUrl: "https://via.placeholder.com/40/10b981/ffffff?text=E2",
  },
  {
    id: "17",
    name: "EVOL 28 Hai Tâm Tâm Hai Hai T...",
    avatarUrl: "https://via.placeholder.com/40/ef4444/ffffff?text=E2",
    notificationCount: 28,
  },
];

export default CommunitiesSidebar;
export { mockCommunities };
export type { Community, CommunitiesSidebarProps };
