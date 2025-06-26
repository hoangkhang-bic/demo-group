import React, { useRef, useState } from "react";
import Page from "@/components/page/page";
import TopHeader from "@/components/bic-components/top-header/top-header";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import PageAndroidTransition from "@/components/wrapper-transistion/page.android.transition";
import { Button } from "@/components/button/button";
import { Touchable } from "@/components/touchable/touchable";
import SafeAreaView from "@/components/seft-area-view/seft-area-view";
import { useNavigate } from "react-router";
import NewsFeeds from "./component/NewsFeeds";
import View from "@/components/View/View";
import ListCommunities from "@pages/CommunitiesPage/component/list-communities";
import CommunitiesSidebar from "@pages/PinCommunities/side-bar-communities";
import { useCommunitiesWithLength } from "@/services/communities-services";
import { CommunitiesItem } from "@pages/CommunitiesPage/component/commuinities-item";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { TopHeaderWeb } from "../TopHeader";

const communities = [
  {
    id: "1",
    name: "Community 1",
    avatarUrl: "https://via.placeholder.com/40",
    isVerified: true,
    isPinned: true,
    notificationCount: 10,
  },
];
const BottomSheetExample: React.FC<{
  open: boolean;
  className?: string;
  onDismiss: () => void;
}> = ({ open, className, onDismiss }) => {
  const sheetRef = useRef(null);
  return (
    <BottomSheet open={open} className={className} onDismiss={onDismiss}>
      <SafeAreaView bottom>
        <div style={{ padding: "20px" }}>
          <h2>Bottom Sheet Content</h2>
          <p>This is a bottom sheet with touch opacity buttons.</p>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "10px",
              zIndex: 1000,
            }}
          >
            <Button
              onPress={onDismiss}
              activeOpacity={0.6}
              style={{ backgroundColor: "#dc3545" }}
            >
              Close Sheet
            </Button>

            <Touchable
              onPress={onDismiss}
              activeOpacity={0.6}
              style={{
                backgroundColor: "#6610f2",
                color: "white",
                borderRadius: "8px",
              }}
              padding="10px 16px"
            >
              <span>Close with Touchable</span>
            </Touchable>
          </div>
        </div>
      </SafeAreaView>
    </BottomSheet>
  );
};

export const HomePage: React.FC = () => {
  const { data: communities } = useCommunitiesWithLength(10);

  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Handler functions for TopHeader
  const handleMenuClick = () => {
    navigate("/pin-communities");
  };
  const handleHomeClick = () => {
    navigate("/home", { replace: true });
  };
  const handleCommunitiesClick = () => {
    navigate("/communities", { replace: true });
  };
  const handleNotificationClick = () => {
    navigate("/notification", { replace: true });
  };
  const handleProfileClick = () => {
    navigate("/profile", { replace: true });
  };
  const handleMarketClick = () => {
    navigate("/market", { replace: true });
  };
  const handleChatClick = () => {
    window.open("https://www.google.com", "_blank");
  };
  return (
    <PageAndroidTransition
      disableTransition={true}
      disableTouchFeedback={true}
      style={{
        paddingBottom: "40px",
      }}
    >
      <View height={`var(--top-header-height)`}>
        <TopHeaderWeb />
      </View>
      <View flexDirection="row" flex={1}>
        {!isMobile && (
          <View
            flex={1}
            overflow="hidden"
            padding={10}
            height={`calc(100vh - var(--top-header-height))`}
            className="overflow-y-auto"
          >
            <CommunitiesSidebar
              communities={communities}
              onSearch={() => {}}
              onCreateCommunity={() => {}}
              onCommunitySelect={() => {}}
            />
          </View>
        )}
        <View flex={3}>
          <NewsFeeds />
        </View>
      </View>

      <BottomSheetExample open={open} onDismiss={() => setOpen(false)} />
    </PageAndroidTransition>
  );
};

export default HomePage;
