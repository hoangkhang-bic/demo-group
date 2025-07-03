import { useLocation } from "react-router-dom";
import { useCommunityData } from "@/services/communities-services";
import { GroupCreate } from "./GroupCreate";
import { useNavigate } from "react-router";

export const GroupCreatePage = () => {
  const {
    state: { group, community },
  } = useLocation();
  const navigate = useNavigate();
  return (
    <GroupCreate
      parentGroup={group}
      rootCommunity={community}
      onClose={() => {
        navigate(-1);
      }}
    />
  );
};
