import { withPlatformManager } from "@utils/Platform.manager";
import GroupDetailPage from "./GroupDetail.mb";
import GroupDetailPageWeb from "./GroupDetail.web";

const GroupDetail = withPlatformManager(GroupDetailPage, GroupDetailPage);

export default GroupDetail;
