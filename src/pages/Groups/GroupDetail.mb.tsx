import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import View from "@/components/View/View";
import PageAndroidTransition from "@/components/wrapper-transistion/page.android.transition";
import MbHeader from "@/components/bic-components/mb-header/mb-header";
import { useGroupById } from "@/services/group-services";
import { IoLockClosed, IoPeople, IoPersonAdd, IoAdd } from "react-icons/io5";
import Image from "@/components/Image/Image";
import Avatar from "@/components/Image/avatar";
import { useGetBottomTabInset } from "@/hooks/useSafeAreaInsets";

const tabBar = [
  {
    name: "About",
    page: "/about",
  },
  {
    name: "Members",
    page: "/members",
  },
  {
    name: "Media",
    page: "/media",
  },
  {
    name: "Files",
    page: "/files",
  },
];

const GroupDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const insetBottom = useGetBottomTabInset();

  const { data: group, isLoading } = useGroupById(id || "");

  const handleInvite = () => {
    // Handle invite
  };

  const handleAdd = () => {
    // Handle add
  };

  if (isLoading || !group) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <span>Loading...</span>
      </View>
    );
  }

  return (
    <PageAndroidTransition
      disableTransition={true}
      style={{
        paddingBottom: insetBottom,
      }}
    >
      <View className="flex flex-col h-full">
        <MbHeader title={group.name} onBackClick={() => navigate(-1)} />

        <View className="relative">
          <Image
            source={group?.avatarUrl || ""}
            width="100%"
            height={200}
            resizeMode="cover"
            alt="Group Cover"
          />

          <View className="absolute -bottom-12 left-4 z-10">
            <Avatar
              source={group.avatarUrl || ""}
              size="xl"
              variant="square"
              alt="Group Avatar"
            />
          </View>
        </View>

        <View className="mt-16 px-4">
          <View
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <View>
              <h1 className="text-xl font-semibold text-gray-900">
                {group.name}
              </h1>
              <View flexDirection="row" gap={12} className="mt-2">
                {group.type === "private" && (
                  <View flexDirection="row" alignItems="center" gap={4}>
                    <IoLockClosed size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-500">Private Group</span>
                  </View>
                )}
                <View flexDirection="row" alignItems="center" gap={4}>
                  <IoPeople size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-500">
                    {group.memberCount} members
                  </span>
                </View>
              </View>
            </View>

            <View flexDirection="row" gap={8}>
              <button
                onClick={handleInvite}
                className="h-8 px-3 bg-primary rounded-xl flex items-center gap-2 text-white text-sm"
              >
                <IoPersonAdd size={16} />
                <span>Invite</span>
              </button>
              <button
                onClick={handleAdd}
                className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center"
              >
                <IoAdd size={16} className="text-gray-600" />
              </button>
            </View>
          </View>
        </View>
        <View
          className="mt-4 px-4 overflow-x-auto flex-row"
          flexDirection="row"
          gap={8}
        >
          {tabBar.map((tab) => (
            <View
              key={tab.name}
              className="px-4 h-8 bg-gray-50 rounded-full flex items-center"
            >
              <span className="text-sm text-gray-900 whitespace-nowrap">
                {tab.name}
              </span>
            </View>
          ))}
        </View>

        <View flex={1} className="mt-4 px-4">
          <span>Content based on selected tab</span>
        </View>
      </View>
    </PageAndroidTransition>
  );
};

export default GroupDetailPage;
