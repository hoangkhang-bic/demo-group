import { useEffect, useState } from "react";
import {
  IoChatboxEllipsesOutline,
  IoMenuOutline,
  IoNotificationsOutline,
  IoSearchOutline,
  IoPersonOutline,
  IoHomeOutline,
  IoHome,
  IoPeopleOutline,
  IoNewspaperOutline,
} from "react-icons/io5";
import View from "@components/View/View";
import Image from "@components/Image/Image";
import { useIsMobile } from "@hooks/useMediaQuery";
import HeaderBar from "@components/header-bar/header-bar";
import "./top-header.css";

import { useUserStore } from "@/store/userStore";
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
  const userInfo = useUserStore((state) => state.user);
  const fetchUserInfo = useUserStore((state) => state.fetchUser);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isMobile = useIsMobile();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const openMenu = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

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
        <View flexDirection="row" alignItems="center" gap={10}>
          <div className="group-icon-menu-header">
            <Touchable onPress={onNotificationClick}>
              <IoNotificationsOutline className="icon" />
            </Touchable>
            <Touchable onPress={onChatClick}>
              <IoChatboxEllipsesOutline className="icon" />
            </Touchable>
          </div>
          <AvatarComponent
            avatar={userInfo?.avatar || ""}
            onPress={onProfileClick}
          />
        </View>
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
  onPress,
}: {
  avatar: string;
  onPress: () => void;
}) => {
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
