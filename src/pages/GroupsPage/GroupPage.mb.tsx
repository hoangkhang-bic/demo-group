import MbHeader from "@/components/bic-components/mb-header/mb-header";
import View from "@/components/View/View";
import PageAndroidTransition from "@/components/wrapper-transistion/page.android.transition";
import { useLocation, useNavigate } from "react-router";
import { BodyCommunitiesDetailMb } from "../CommunitiesDetail/component/body.mb";
import GroupInner from "../Groups/components/group-inner";
import { Group, useCommunityData } from "@/services/communities-services";
import { useState } from "react";
import deepNestedCommunityMockData from "@/services/mock-communities-deep-nested";
import SearchCommunities from "../CommunitiesPage/component/search-communites";
import { IoCloudyNight, IoSearch } from "react-icons/io5";
import SearchInput from "../CommunitiesPage/component/search-input/search-input";

export default function GroupsPageWeb() {
  const navigate = useNavigate();
  const handleCreateGroup = () => {
    navigate("/groups/create");
  };
  const { state } = useLocation();
  const { data: community, isLoading } = useCommunityData(state?.communityId);
  // const communityData = deepNestedCommunityMockData;
  return (
    <PageAndroidTransition>
      <View flex className="h-screen">
        <MbHeader title="Your Groups" />
        <View flexDirection="row" gap={10} fullWidth padding={10}>
          <SearchInput onSearch={() => {}} />
        </View>
        {isLoading ? (
          <View flex={1} justifyContent="center" alignItems="center">
            <span>Loading...</span>
          </View>
        ) : (
          <View flex={1} alignItems="center" padding={10} overflow="auto">
            {community?.groups?.length === 0 ? (
              <View flex={1} justifyContent="center" alignItems="center">
                <span>No groups found</span>
              </View>
            ) : (
              <GroupInner
                rootGroup={community as unknown as Group}
                groups={community?.groups || []}
              />
            )}
          </View>
        )}
      </View>
    </PageAndroidTransition>
  );
}
