import View from "@/components/View/View";
import ListCommunities from "../../CommunitiesPage/component/list-communities";
import NewsFeeds from "@/pages/HomePage/component/NewsFeeds";

export const BodyCommunitiesDetailMb = () => {
  return (
    <View gap={10} height={"100%"} paddingVertical={10} paddingHorizontal={10}>
      <NewsFeeds />
    </View>
  );
};
