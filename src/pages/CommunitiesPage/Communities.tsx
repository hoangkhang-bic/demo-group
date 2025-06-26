import { withPlatformManager } from "@utils/Platform.manager";
import CommunitiesPage from "./Communities.mb";
import CommunitiesPageWeb from "./Communities.web";

const Communities = withPlatformManager(CommunitiesPage, CommunitiesPageWeb);

export default Communities;
