import { useParams } from "react-router";
import PageAndroidTransition from "@components/wrapper-transistion/page.android.transition";
import View from "@/components/View/View";
import MbHeader from "@/components/bic-components/mb-header/mb-header";
import { useNavigate } from "react-router";
import { useCommunityData } from "@store/communitiesStore";
import PlatformManager, { withPlatformManager } from "@/utils/Platform.manager";
import CommunitiesDetailWeb from "./communities-detail.web";
import CommunitiesDetailMb from "./communities-detail.mb";

const CommunitiesDetail = withPlatformManager(
  CommunitiesDetailMb,
  CommunitiesDetailWeb
);
export default CommunitiesDetail;
