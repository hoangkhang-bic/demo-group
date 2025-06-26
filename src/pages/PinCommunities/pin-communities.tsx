import View from "@/components/View/View";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import MbHeader from "@components/bic-components/mb-header/mb-header";
import PageAndroidTransition from "@/components/wrapper-transistion/page.android.transition";
import ListCommunities from "../CommunitiesPage/component/list-communities";

export const PinCommunities = () => {
  const navigate = useNavigate();
  const headerWithBack = () => {
    return <View> </View>;
  };
  return (
    <PageAndroidTransition disableTouchFeedback disableTransition>
      <View flexDirection="column">
        <MbHeader
          title="Pin Communities"
          onBackClick={() => navigate("/home")}
        />
        <View flexDirection="column" overflow="auto" flex={1} padding={10}>
          <ListCommunities />
        </View>
      </View>
    </PageAndroidTransition>
  );
};
