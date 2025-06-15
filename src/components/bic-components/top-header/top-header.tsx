import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  chatboxEllipsesOutline,
  menuOutline,
  notificationsOutline,
  searchOutline,
  personOutline,
} from "ionicons/icons";
import View from "@components/View/View";
import Image from "@components/Image/Image";
import { useIsMobile } from "@hooks/useMediaQuery";
import HeaderBar from "@components/header-bar/header-bar";
import "./top-header.css";

export default function BeincomHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isMobile = useIsMobile();

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
      <View flexDirection="row" alignItems="center" gap={10} flex={1}>
        {isMobile && <Menu onClick={openMenu} />}
        <View flexDirection="row" alignItems="center" gap={10}>
          <Image source={"/assets/images/logo.png"} className="logo" />
          <Image
            source={"/assets/images/image-logo.png"}
            className="image-logo"
          />
        </View>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <View flexDirection="row" alignItems="center" gap={10}>
          <IonIcon icon={notificationsOutline} />
          <IonIcon icon={chatboxEllipsesOutline} />
          {/* <AvatarComponent avatar={userInfo?.avatar || ""} onClick={() => {}} /> */}
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
  onClick,
}: {
  avatar: string;
  onClick: () => void;
}) => {
  return (
    <View>
      {avatar ? (
        <Image source={avatar} className="avatar" onClick={onClick} />
      ) : (
        <IonIcon icon={personOutline} className="avatar" />
      )}
    </View>
  );
};
const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <View
      className="search-bar"
      flexDirection="row"
      alignItems="center"
      height={40}
      width={"100%"}
      borderRadius={10}
      borderWidth={1}
      borderColor="var(--ion-color-light-shade)"
      paddingHorizontal={10}
    >
      <IonIcon icon={searchOutline} className="search-icon" />
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
    <IonIcon
      onClick={onClick}
      icon={menuOutline}
      style={{
        borderRadius: "50%",
        height: "24px",
        width: "24px",
      }}
    />
  );
};
