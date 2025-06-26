import TopHeader from "@/components/bic-components/top-header/top-header";
import View from "@/components/View/View";
import { useNavigate } from "react-router-dom";

export const TopHeaderWeb = () => {
  const navigate = useNavigate();
  const handleMenuClick = () => {
    navigate("/pin-community");
  };
  const handleHomeClick = () => {
    navigate("/");
  };
  const handleCommunitiesClick = () => {
    navigate("/communities");
  };
  const handleMarketClick = () => {
    navigate("/market");
  };
  const handleNotificationClick = () => {
    navigate("/notification");
  };
  const handleProfileClick = () => {
    navigate("/profile");
  };
  const handleChatClick = () => {
    navigate("/chat");
  };
  return (
    <TopHeader
      onMenuClick={handleMenuClick}
      onHomeClick={handleHomeClick}
      onPeopleClick={handleCommunitiesClick}
      onMarketClick={handleMarketClick}
      onNotificationClick={handleNotificationClick}
      onProfileClick={handleProfileClick}
      onChatClick={handleChatClick}
    />
  );
};
