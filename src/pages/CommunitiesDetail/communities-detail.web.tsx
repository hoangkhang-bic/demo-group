import { useNavigate, useParams } from "react-router";
import { Header } from "./component/header.web";
import View from "@/components/View/View";
import NewsFeeds from "@/pages/HomePage/component/NewsFeeds";
import { Touchable } from "@/components/touchable/touchable";
import { IoAdd } from "react-icons/io5";
import GroupInner from "../Groups/components/group-inner";
import { allCommunities } from "@/services/mock-communities-index";
import {
  Community,
  Group,
  useGetCommunityById,
} from "@/services/communities-services";
import deepNestedCommunityMockData from "@/services/mock-communities-deep-nested";
import { BodyCommunitiesDetailWeb } from "./component/body.web";
import { TopHeaderWeb } from "../TopHeader";
export const CommunitiesDetailWeb = () => {
  const { id } = useParams();
  const { data: community, isLoading } = useGetCommunityById(id || "");
  return (
    <div className="flex flex-1 w-full p-20 bg-gray-100">
      <div className="flex flex-col w-full rounded-lg">
        <View height={`var(--top-header-height-desktop)`}>
          <TopHeaderWeb />
        </View>
        {isLoading && <div>Loading...</div>}
        {community && (
          <BodyCommunitiesDetailWeb
            community={community || ({} as Community)}
          />
        )}
      </div>
    </div>
  );
};

export default CommunitiesDetailWeb;
