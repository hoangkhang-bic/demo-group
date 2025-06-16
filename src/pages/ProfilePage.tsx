import MbHeader from "@/components/bic-components/mb-header/mb-header";
import PageAndroidTransition from "@/components/wrapper-transistion/page.android.transition";
import SafeAreaView from "@/components/seft-area-view/seft-area-view";
import View from "@/components/View/View";
import { useEffect } from "react";

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
          backgroundColor: "red",
        }}
      >
        <View flex={1} backgroundColor={"red"} height={"100%"}>
          <p>profile page</p>
        </View>
      </SafeAreaView>
    </PageAndroidTransition>
  );
};
