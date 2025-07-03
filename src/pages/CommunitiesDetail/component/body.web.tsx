import View from "@/components/View/View";
import NewsFeeds from "@/pages/HomePage/component/NewsFeeds";
import GroupInner from "@/pages/Groups/components/group-inner";
import { Community, Group } from "@/services/communities-services";
import { Touchable } from "@/components/touchable/touchable";
import { IoAdd } from "react-icons/io5";
import { ModalCreateGroup } from "@/pages/GroupsPage/components/modal-create-group";
import GroupCreate from "@/pages/Groups/GroupCreate";
import { useRef, useState } from "react";

export const BodyCommunitiesDetailWeb = ({
  community,
}: {
  community: Community;
}) => {
  const modalCreateGroupRef = useRef<any>(null);
  const [parentGroup, setParentGroup] = useState<Group | undefined>(undefined);
  return (
    <View flex={1}>
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
              onCreateGroup={(group) => {
                console.log("group ====>>>", group);
                setParentGroup(group);
                modalCreateGroupRef.current.open();
              }}
            />
          </View>
        </View>
        <View flex={3} height="100%" overflow="hidden">
          <NewsFeeds />
        </View>
      </View>
      <ModalCreateGroup
        ref={modalCreateGroupRef}
        onClose={() => {
          console.log("clear data");
        }}
      >
        <GroupCreate
          parentGroup={parentGroup}
          rootCommunity={community}
          onClose={() => {
            modalCreateGroupRef.current.close();
            setParentGroup(undefined);
          }}
        />
      </ModalCreateGroup>
    </View>
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
