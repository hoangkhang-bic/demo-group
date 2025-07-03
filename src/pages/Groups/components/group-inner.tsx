import View from "@/components/View/View";
import { Group } from "@/services/communities-services";
import { getGroupByCommunityId } from "@/services/mock-communities-index";
import { GroupItemLight } from "./group-item";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { Touchable } from "@/components/touchable/touchable";
import { useNavigate } from "react-router";

const VerticalDash = () => {
  return <div className="w-[1px] h-full bg-primary-dark" />;
};
const RootGroupView = ({
  groups,
  children,
  onCreateGroup,
}: {
  groups: Group;
  children: React.ReactNode;
  onCreateGroup?: (group: Group) => void;
}) => {
  // only the root group view will be 1 root and 1
  // * web platform create group
  const createGroup = (group: Group) => {
    onCreateGroup?.(group);
  };
  const showExpand = groups?.groups && groups?.groups.length > 0;
  const [isHovering, setIsHovering] = useState(false);
  const [isExpand, setIsExpand] = useState(
    groups?.groups && groups?.groups.length > 0
  );
  return (
    <View gap={10} width="100%">
      <View
        zIndex={1}
        width="100%"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        onHoverChange={(isHovering, event) => {
          setIsHovering(isHovering);
        }}
      >
        <GroupItemLight
          expand={showExpand}
          avatarUrl={groups?.avatarUrl}
          onExpandClick={() => setIsExpand(!isExpand)}
          name={groups?.name}
          type={groups?.type as "private" | "public" | "secret"}
        />
        {isHovering && (
          <Touchable
            onPress={() => createGroup(groups)}
            style={{
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--color-primary-dark)",
            }}
          >
            <IoAdd size={30} color="white" />
          </Touchable>
        )}
      </View>

      {groups?.groups && isExpand && <View className="pl-5">{children}</View>}
      {groups?.groups && (
        <View
          position="absolute"
          bottom={0}
          left={12}
          zIndex={0}
          right={0}
          top={0}
          overflow="hidden"
        >
          <VerticalDash />
        </View>
      )}
    </View>
  );
};

const NestedGroupView = ({
  groups,
  onCreateGroup,
}: {
  groups: Group[];
  onCreateGroup?: (group: Group) => void;
}) => {
  return (
    <View className={`pl-${groups?.length * 10} gap-2`} width="100%">
      {groups?.map((_group) => {
        return (
          <View gap={10} width="100%">
            <RootGroupView
              onCreateGroup={onCreateGroup}
              key={_group?.id}
              groups={_group}
            >
              {_group?.groups && (
                <NestedGroupView
                  onCreateGroup={onCreateGroup}
                  groups={_group?.groups || []}
                />
              )}
            </RootGroupView>
          </View>
        );
      })}
    </View>
  );
};
const nestedGroupDetail = ({
  rootGroup,
  groups,
  communityId,
  onCreateGroup,
}: {
  rootGroup: Group;
  groups: Group[];
  communityId?: string;
  onCreateGroup?: (group: Group) => void;
}) => {
  const groupList = communityId ? getGroupByCommunityId(communityId) : groups;
  const [isShowMore, setIsShowMore] = useState(
    groupList?.length && groupList?.length > 3
  );
  useEffect(() => {
    setIsShowMore(groupList?.length && groupList?.length > 3);
  }, [groupList]);

  return (
    <View className="flex flex-col gap-2" flexWrap="wrap" width="100%">
      <RootGroupView
        key={rootGroup?.id}
        groups={rootGroup}
        onCreateGroup={onCreateGroup}
      >
        <NestedGroupView
          onCreateGroup={onCreateGroup}
          groups={rootGroup?.groups || []}
        />
      </RootGroupView>
    </View>
  );
};

export default nestedGroupDetail;
