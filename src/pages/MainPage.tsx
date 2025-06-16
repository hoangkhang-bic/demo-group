import BottomTab from "@/components/bottom-tab/bottom-tab";
import { useMobileLayout } from "@/hooks/useMediaQuery";
import { Outlet } from "react-router";

export const MainPage = () => {
  const isMobile = useMobileLayout();
  return (
    <>
      <Outlet />
      {isMobile && <BottomTab />}
    </>
  );
};
