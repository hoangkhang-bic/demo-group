import MbHeader from "@/components/bic-components/mb-header/mb-header";
import PageAndroidTransition from "@/components/wrapper-transistion/page.android.transition";
import SafeAreaView from "@/components/seft-area-view/seft-area-view";
import View from "@/components/View/View";
import { useEffect } from "react";
import Image from "@/components/Image/Image";
import Profile from "@/assets/images/profile_image.png";
import { TopHeaderWeb } from "./TopHeader";

export const ProfilePage = () => {
  useEffect(() => {
    console.log("ProfilePage");
  }, []);
  return (
    <PageAndroidTransition
      disableTransition={false}
      disableTouchFeedback={false}
    >
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <TopHeaderWeb />
        <View
          flex={1}
          height={"100%"}
          justifyContent="center"
          alignItems="center"
        >
          <Image
            source={Profile}
            resizeMode="stretch"
            height={"100%"}
            width={"100%"}
          />
        </View>
      </SafeAreaView>
    </PageAndroidTransition>
  );
};
