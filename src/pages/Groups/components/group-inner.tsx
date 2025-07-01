import View from "@/components/View/View";
import { Group } from "@/services/communities-services";
import { getGroupByCommunityId } from "@/services/mock-communities-index";
import { GroupItemLight } from "./group-item";
import { useEffect, useState } from "react";
import { Button } from "@/components/button/button";
import { useNavigate } from "react-router";
import { IoAdd } from "react-icons/io5";

export const convertGroupNestedDetail = (groups: Group[]) => {
  // * create matrix nested detail
  const matrix = [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [2, 5],
    [2, 6],
  ];
};
const VerticalDash = () => {
  return <div className="w-[1px] h-full bg-primary-dark" />;
};
const RootGroupView = ({
  groups,
  children,
}: {
  groups: Group;
  children: React.ReactNode;
}) => {
  // only the root group view will be 1 root and 1
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
          <View
            className="flex flex-col items-center justify-center"
            backgroundColor="var(--color-primary-dark)"
            borderRadius={10}
            padding={8}
          >
            <IoAdd size={20} color="white" />
          </View>
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

const NestedGroupView = ({ groups }: { groups: Group[] }) => {
  return (
    <View className={`pl-${groups?.length * 10} gap-2`} width="100%">
      {groups?.map((_group) => {
        return (
          <View gap={10} width="100%">
            <RootGroupView key={_group?.id} groups={_group}>
              {_group?.groups && (
                <NestedGroupView groups={_group?.groups || []} />
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
}: {
  rootGroup: Group;
  groups: Group[];
  communityId?: string;
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
      <RootGroupView key={rootGroup?.id} groups={rootGroup}>
        <NestedGroupView groups={rootGroup?.groups || []} />
      </RootGroupView>
    </View>
  );
};

export default nestedGroupDetail;
