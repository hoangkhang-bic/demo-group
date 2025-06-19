import { useEffect, useState } from "react";
import {
  IoChatboxEllipsesOutline,
  IoMenuOutline,
  IoNotificationsOutline,
  IoSearchOutline,
  IoPersonOutline,
  IoHomeOutline,
  IoPeopleOutline,
  IoNewspaperOutline,
} from "react-icons/io5";
import View from "@components/View/View";
import Image from "@components/Image/Image";
import { useIsMobile } from "@hooks/useMediaQuery";
import HeaderBar from "@components/header-bar/header-bar";
import "./top-header.css";

// Import the new hook that combines Zustand and React Query
import { useUserData } from "@/store/userStore";
import { Touchable } from "@/components/touchable/touchable";

export default function BeincomHeader({
  onMenuClick,
  onHomeClick,
  onPeopleClick,
  onMarketClick,
  onNotificationClick,
  onProfileClick,
  onChatClick,
}: {
  onMenuClick: () => void;
  onHomeClick: () => void;
  onPeopleClick: () => void;
  onMarketClick: () => void;
  onNotificationClick: () => void;
  onProfileClick: () => void;
  onChatClick: () => void;
}) {
  // Use the combined hook that provides both Zustand and React Query functionality
  const { user, isLoading } = useUserData();
  const [searchQuery, setSearchQuery] = useState("");

  const isMobile = useIsMobile();
  return (
    <HeaderBar className={isMobile ? "mobile-header" : "desktop-header"}>
      <View
        flexDirection="row"
        alignItems="center"
        gap={10}
        flex={1}
        className="header-content"
        justifyContent="space-between"
      >
        {isMobile && <Menu onClick={onMenuClick} />}
        <View flexDirection="row" alignItems="center" gap={10}>
          <Image source={"/assets/images/logo.png"} className="logo" />
          <Image
            source={"/assets/images/image-logo.png"}
            className="image-logo"
          />
          <View className="group-icon-menu-header" hideOnMobile={isMobile}>
            <Touchable onPress={onHomeClick} style={{ padding: 0 }}>
              <IoHomeOutline className="icon" />
            </Touchable>
            <Touchable onPress={onPeopleClick}>
              <IoPeopleOutline className="icon" />
            </Touchable>
            <Touchable onPress={onMarketClick}>
              <IoNewspaperOutline className="icon" />
            </Touchable>
          </View>
        </View>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <View
          flexDirection="row"
          alignItems="center"
          gap={10}
          hideOnMobile={isMobile}
        >
          <View className="group-icon-menu-header">
            <Touchable onPress={onNotificationClick}>
              <IoNotificationsOutline className="icon" />
            </Touchable>
            <Touchable onPress={onChatClick}>
              <IoChatboxEllipsesOutline className="icon" />
            </Touchable>
          </View>
        </View>
        <AvatarComponent
          avatar={user?.avatar || ""}
          isLoading={isLoading}
          hideOnMobile={isMobile}
          onPress={onProfileClick}
          onChatPress={onChatClick}
        />
      </View>
    </HeaderBar>
  );
}

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const AvatarComponent = ({
  avatar,
  isLoading,
  onPress,
  onChatPress,
  hideOnMobile,
}: {
  avatar: string;
  isLoading?: boolean;
  onPress: () => void;
  onChatPress?: () => void;
  hideOnMobile?: boolean;
}) => {
  if (isLoading) {
    return <div className="avatar-loading" />;
  }
  if (hideOnMobile) {
    return (
      <Touchable onPress={onChatPress}>
        <IoChatboxEllipsesOutline className="icon" />
      </Touchable>
    );
  }
  return (
    <Touchable onPress={onPress}>
      {avatar ? (
        <Image source={avatar} className="avatar" />
      ) : (
        <IoPersonOutline className="avatar" />
      )}
    </Touchable>
  );
};

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <View
      className="search-bar"
      flexDirection="row"
      alignItems="center"
      height={40}
      borderRadius={10}
      borderWidth={1}
      borderColor="var(--ion-color-light-shade)"
      paddingHorizontal={10}
    >
      <IoSearchOutline className="search-icon" />
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
    </View>
  );
};

const Menu = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <Touchable onPress={onClick}>
        <IoMenuOutline className="menu-icon" />
      </Touchable>
    </>
  );
};
