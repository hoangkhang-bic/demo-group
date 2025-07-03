import MbHeader from "@/components/bic-components/mb-header/mb-header";
import { HeaderMobile } from "./component/header.mb";
import View from "@/components/View/View";
import { BodyCommunitiesDetailMb } from "./component/body.mb";
import { useParams } from "react-router";
import { useGetCommunityById } from "@/services/communities-services";
import PageAndroidTransition from "@/components/wrapper-transistion/page.android.transition";
import PlatformManager from "@/utils/Platform.manager";

export const CommunitiesDetailMb = () => {
  const { id } = useParams();
  const { data: community, isLoading } = useGetCommunityById(id || "");

  return (
    <PageAndroidTransition>
      <MbHeader
        style={{
          height: 56,
        }}
        title={community?.name || "CommunitiesDetailMb"}
      />
      <View flex={1}>
        {" "}
        {/* Adjust marginTop based on your header height */}
        {isLoading && <div>Loading...</div>}
        {community && (
          <View flex={1} overflow="auto">
            <HeaderMobile
              coverImage={community?.avatarUrl}
              avatarImage={community?.avatarUrl}
              groupName={community?.name || "Community Name"}
              isPrivate={false}
              memberCount={0}
              communityId={id || "123456"}
            />
            <BodyCommunitiesDetailMb />
          </View>
        )}
      </View>
    </PageAndroidTransition>
  );
};

export default CommunitiesDetailMb;
