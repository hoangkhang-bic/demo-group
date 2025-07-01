import { useNavigate, useParams } from "react-router";
import { Header } from "./component/header.web";
import View from "@/components/View/View";
import NewsFeeds from "@/pages/HomePage/component/NewsFeeds";
import { Touchable } from "@/components/touchable/touchable";
import { IoAdd } from "react-icons/io5";
import GroupInner from "../Groups/components/group-inner";
import { allCommunities } from "@/services/mock-communities-index";
import { Group } from "@/services/communities-services";
import deepNestedCommunityMockData from "@/services/mock-communities-deep-nested";
export const CommunitiesDetailWeb = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const community = allCommunities[0];
  return (
    <div className="flex flex-1 w-full p-20 bg-gray-100">
      <div className="flex flex-col w-full rounded-lg">
        <Header
          communityName="Community Name"
          memberCount={100}
          onChatClick={() => {}}
          onMoreClick={() => {}}
          activeTab="timeline"
          coverImage="https://picsum.photos/200/300"
          avatarImage="https://picsum.photos/200/300"
          onTabChange={() => {}}
        />
        <View flex={1} flexDirection="row">
          <View flex={1} paddingVertical={10} position="relative" top={0}>
            <TagComponent
              onPress={() => {
                console.log("add tag");
              }}
            />
            <View
              className="mt-4"
              backgroundColor="white"
              width="100%"
              overflow="auto"
              borderRadius={10}
              padding={4}
            >
              <GroupInner
                rootGroup={community}
                groups={community?.groups || []}
              />
            </View>
          </View>
          <View flex={3} height="100%" overflow="hidden">
            <NewsFeeds />
          </View>
        </View>
      </div>
    </div>
  );
};
const TagComponent = ({ onPress }: { onPress: () => void }) => {
  const Dash = () => {
    return (
      <div className="w-full h-0.5 bg-gray-200 my-2 rounded-full rounded-2xl"></div>
    );
  };
  return (
    <View
      backgroundColor="white"
      borderRadius={10}
      style={{
        padding: 10,
        gap: 20,
      }}
    >
      <View>
        <span className="text-lg font-bold">Tags</span>
        <Dash />
      </View>
      <span className="text-sm text-gray-500">No tags found</span>
      <Touchable
        fullWidth
        style={{
          height: 40,
        }}
        className="
    flex-1
    flex-row
    bg-gray-200 text-white px-4 py-2 rounded-md"
        onPress={onPress}
      >
        <IoAdd />
        <span>Add tag</span>
      </Touchable>
    </View>
  );
};
export default CommunitiesDetailWeb;
