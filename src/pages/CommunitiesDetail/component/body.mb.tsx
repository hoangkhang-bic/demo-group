import View from "@/components/View/View";
import ListCommunities from "../../CommunitiesPage/component/list-communities";

export const BodyCommunitiesDetailMb = () => {
  return (
    <View
      gap={10}
      height={"100%"}
      overflow="auto"
      paddingVertical={10}
      paddingHorizontal={10}
    >
      <span>this is content</span>
      <ListCommunities />
    </View>
  );
};
