import React from "react";
import { CommunitiesItem } from "./commuinities-item";
import ListView from "@components/virtual-list/virtual-list";
import { useCommunitiesWithLength } from "@services/communities-services";
import View from "@/components/View/View";
import { useNavigate } from "react-router";

export const ListCommunities = () => {
  const { data: communities } = useCommunitiesWithLength(20);
  const navigate = useNavigate();
  const renderItem = (item: any) => {
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
      keyExtractor={(item: any) => item.id}
      data={communities || []}
      renderItem={renderItem}
      rowSpacing={20}
    />
  );
};

export default ListCommunities;
