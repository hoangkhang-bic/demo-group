import React from "react";
import View from "../../../components/View/View";
import Avatar from "../../../components/Image/avatar";
import communityAvatar from "../../../assets/images/community-avatar.png";
import { Touchable } from "@/components/touchable/touchable";

interface CommunitiesItemProps {
  name: string;
  avatarUrl?: string;
  showBadge?: boolean;
  showVerify?: boolean;
  showSubtitle?: boolean;
  style?: "default" | "only-name";
  status?: "default" | "selected";
  onClick?: () => void;
}

export const CommunitiesItem: React.FC<CommunitiesItemProps> = ({
  name = "Lorem ipsum dolor sit amet",
  avatarUrl = communityAvatar,
  showBadge = false,
  showVerify = false,
  showSubtitle = true,
  style = "default",
  status = "default",
  onClick,
}) => {
  console.log("avatarUrl", avatarUrl);
  return (
    <View
      flexDirection="row"
      alignItems="center"
      borderRadius={10}
      borderWidth={1}
      borderColor="var(--color-border)"
      padding={10}
      gap={10}
      style={{ cursor: "pointer" }}
    >
      <Touchable onPress={onClick} className="flex">
        <View flexDirection="row" alignItems="center" gap={10}>
          <Avatar
            source={avatarUrl}
            size="xl"
            variant="circle"
            alt="Community Avatar"
            className="w-16 h-16 rounded-[20px]"
          />
          <View className="flex flex-col justify-center flex-1">
            <View className="flex flex-row items-center gap-1 w-full">
              <span
                className="text-sm font-medium line-clamp-1 bg-gradient-to-r from-[#6F32BB] via-[#7230FF] via-[#B377FE] via-[#7331FE] to-[#6F32BD] bg-clip-text text-transparent"
                style={{ lineHeight: "1.5em" }}
              >
                {name}
              </span>
            </View>
          </View>
        </View>
      </Touchable>
    </View>
  );
};
