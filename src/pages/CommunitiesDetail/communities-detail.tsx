import { useParams } from "react-router";
import PageAndroidTransition from "@components/wrapper-transistion/page.android.transition";
import View from "@/components/View/View";
import MbHeader from "@/components/bic-components/mb-header/mb-header";
import { useNavigate } from "react-router";
import { useCommunityData } from "@store/communitiesStore";

export const CommunitiesDetail = () => {
  const { id } = useParams();
  // const { community } = useCommunityData(id as string);

  const navigate = useNavigate();
  return (
    <PageAndroidTransition>
      <View flexDirection="column">
        <MbHeader title="Communities Detail" onBackClick={() => navigate(-1)} />
        <View flexDirection="column" overflow="auto" flex={1}>
          <div>CommunitiesDetail</div>
          <div>{id}</div>
        </View>
      </View>
    </PageAndroidTransition>
  );
};

export default CommunitiesDetail;
