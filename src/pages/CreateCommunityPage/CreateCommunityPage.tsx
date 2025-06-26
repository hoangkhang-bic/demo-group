import MbHeader from "@/components/bic-components/mb-header/mb-header";
import View from "@/components/View/View";
import PageAndroidTransition from "@components/wrapper-transistion/page.android.transition";
import { useNavigate } from "react-router";
import ListCommunities from "../CommunitiesPage/component/list-communities";

export const CreateCommunityPage = () => {
  const navigate = useNavigate();
  return (
    <PageAndroidTransition disableTransition={true}>
      <View flexDirection="column">
        <MbHeader
          title="Create Community"
          onBackClick={() => navigate("/home")}
        />
        <View flexDirection="column" overflow="auto" flex={1}>
          <ListCommunities />
        </View>
      </View>
    </PageAndroidTransition>
  );
};

export default CreateCommunityPage;
