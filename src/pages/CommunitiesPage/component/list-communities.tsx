import React, { useEffect, useState } from "react";
import { CommunitiesItem } from "./commuinities-item";
import ListView from "@components/virtual-list/virtual-list";
import {
  Community,
  useGetListCommunities,
  useUserCommunities,
} from "@services/communities-services";
import { useNavigate } from "react-router";

export const ListCommunities = () => {
  const {
    data: communitiesData,
    isLoading,
    refetch,
  } = useGetListCommunities({
    refetchOnWindowFocus: false,
  });
  console.log("communitiesData", isLoading);
  const navigate = useNavigate();
  const renderItem = ({ item }: { item: Community }) => {
    return (
      <CommunitiesItem
        avatarUrl={item.avatarUrl}
        name={item.name}
        onClick={() => {
          navigate(`/communities/${item?.id}`);
        }}
      />
    );
  };

  return (
    <ListView
      keyExtractor={(item: Community) => item.id}
      data={communitiesData || []}
      renderItem={renderItem}
      rowSpacing={20}
    />
  );
};

export default ListCommunities;
