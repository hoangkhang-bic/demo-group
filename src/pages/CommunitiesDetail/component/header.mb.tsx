import React from "react";
import { useNavigate, useParams } from "react-router";
import {
  IoCamera,
  IoPersonAdd,
  IoAdd,
  IoLockClosed,
  IoPeople,
} from "react-icons/io5";

import View from "@/components/View/View";
import Image from "@/components/Image/Image";
import VirtualList from "@/components/virtual-list/virtual-list";
import { Touchable } from "@/components/touchable/touchable";

interface HeaderMobileProps {
  coverImage?: string;
  avatarImage?: string;
  groupName: string;
  isPrivate?: boolean;
  memberCount?: number;
  onInvite?: () => void;
  onAdd?: () => void;
  onSearch?: () => void;
  onMore?: () => void;
  onChat?: () => void;
  unreadMessages?: number;
  communityId?: string;
}

export const HeaderMobile: React.FC<HeaderMobileProps> = ({
  coverImage,
  avatarImage,
  groupName,
  isPrivate = false,
  memberCount,
  onInvite,
  onAdd,
  onSearch,
  onMore,
  onChat,
  communityId,
  unreadMessages = 0,
}) => {
  console.log(communityId);
  const navigate = useNavigate();
  const { groupId } = useParams();
  const gotoGroup = () => {
    navigate("/groups");
  };
  const tabBar = [
    {
      name: "About",
      page: "/about",
      state: {
        communityId,
      },
    },
    {
      name: "Your groups",
      page: "/groups",
      state: {
        communityId,
      },
    },
    {
      name: "Discover groups",
      page: "/discover-groups",
      state: {
        communityId,
      },
    },
    {
      name: "Members",
      page: `/groups/${communityId}/members`,
      state: {
        communityId,
      },
    },
    {
      name: "Tags",
      page: `/groups/${communityId}/tags`,
      state: {
        communityId,
      },
    },
  ];
  const navigateToPage = ({ page, state }: { page: string; state: any }) => {
    navigate(page, { state });
  };
  return (
    <View className="w-full flex flex-col">
      <div className="flex flex-col items-enter w-full">
        <div className="w-full h-[187.5px] relative">
          <img
            src={coverImage || ""}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <button
            className="absolute right-4 bottom-4 w-7 h-7 bg-white rounded-full flex justify-center items-center shadow"
            type="button"
          >
            <IoCamera size={20} color="#494949" />
          </button>
        </div>

        <div className="w-full px-4 -mt-10 flex justify-between items-end">
          <div className="relative w-20 h-20">
            <View
              className="w-[var(--avatar-size-mobile)] h-[var(--avatar-size-mobile)]"
              borderRadius={10}
              backgroundColor="red"
              overflow="hidden"
              borderColor="var(--color-gray-100)"
              borderWidth={2}
            >
              <Image
                source={avatarImage || ""}
                resizeMode="cover"
                height={"100%"}
                width={"100%"}
                borderRadius={10}
              />
            </View>

            <button
              className="absolute -right-2 -bottom-2 w-7 h-7 bg-white rounded-full flex justify-center items-center shadow"
              type="button"
            >
              <IoCamera size={16} color="#494949" />
            </button>
          </div>

          <div className="flex gap-2">
            <button
              className="h-8 px-2 bg-primary rounded-xl flex items-center gap-1 text-white text-sm font-medium"
              onClick={onInvite}
              type="button"
            >
              <IoPersonAdd size={20} color="#FFFFFF" />
              <span>Invite</span>
            </button>

            <button
              className="w-8 h-8 bg-gray-100 rounded-xl flex justify-center items-center"
              onClick={onAdd}
              type="button"
            >
              <IoAdd size={20} color="#494949" />
            </button>
          </div>
        </div>

        <div className="w-full px-4 py-4 flex flex-col gap-2">
          <h1 className="text-lg font-semibold text-gray-900 leading-snug m-0">
            {groupName}
          </h1>
          <div className="flex gap-4">
            {isPrivate && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <IoLockClosed size={16} />
                <span className="text-sm">Private</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-gray-600">
              <IoPeople size={16} />
              <span className="text-sm">{memberCount} Members</span>
            </div>
          </div>
        </div>
        <View
          fullWidth
          className="w-full"
          justifyContent="center"
          paddingHorizontal={10}
        >
          <div className="flex gap-2 overflow-x-auto">
            {tabBar.map((item) => (
              <Touchable key={item.name} onPress={() => navigateToPage(item)}>
                <div className="h-8 px-4 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-gray-900 text-sm whitespace-nowrap">
                  {item.name}
                </div>
              </Touchable>
            ))}
          </div>
        </View>
      </div>
    </View>
  );
};
