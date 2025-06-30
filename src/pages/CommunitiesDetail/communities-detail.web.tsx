import { useNavigate, useParams } from "react-router";
import { Header } from "./component/header.web";

export const CommunitiesDetailWeb = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-full p-20 bg-gray-100">
      <div className="flex flex-col w-full rounded-lg overflow-hidden">
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
      </div>
    </div>
  );
};

export default CommunitiesDetailWeb;
