import MbHeader from "@/components/bic-components/mb-header/mb-header";
import { HeaderMobile } from "./component/header.mb";
import View from "@/components/View/View";
import ListCommunities from "../CommunitiesPage/component/list-communities";
import { BodyCommunitiesDetailMb } from "./component/body.mb";
export const CommunitiesDetailMb = () => {
  return (
    <View flex className="h-screen">
      <MbHeader title="CommunitiesDetailMb" />
      <HeaderMobile
        coverImage={
          "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        avatarImage={
          "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        groupName={"Community Name"}
        isPrivate={false}
        memberCount={0}
      />
      <BodyCommunitiesDetailMb />
    </View>
  );
};

export default CommunitiesDetailMb;
