import React, { useMemo } from "react";
import {
  IoHomeOutline,
  IoSearchOutline,
  IoNotificationsOutline,
  IoPersonOutline,
  IoHome,
  IoSearch,
  IoNotifications,
  IoPerson,
  IoAddOutline,
  IoAdd,
  IoPeopleOutline,
  IoPeople,
} from "react-icons/io5";
import { Link, useLocation } from "react-router";
import "./bottom-tab.css";
import Avatar, { AvatarPlaceholder } from "../Image/avatar";
import { useUserStore } from "@/store/userStore";
import View from "@components/View/View";

interface TabItem {
  id: number;
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  path: string;
}

// Memoize tabs to prevent unnecessary re-renders
const tabs: TabItem[] = [
  {
    id: 1,
    label: "",
    icon: <IoHomeOutline className="tab-icon" />,
    activeIcon: <IoHome className="tab-icon" />,
    path: "/home",
  },
  {
    id: 2,
    label: "",
    icon: <IoPeopleOutline className="tab-icon" />,
    activeIcon: <IoPeople className="tab-icon" />,
    path: "/communities",
  },
  {
    id: 3,
    label: "",
    icon: (
      <View
        justifyContent="center"
        alignItems="center"
        width={"2.2em"}
        height={"2.2em"}
        className="rounded-full"
        backgroundColor="var(--color-primary-500)"
      >
        <IoAddOutline size={20} color="var(--color-primary)" />
      </View>
    ),
    activeIcon: (
      <div className="flex items-center justify-center bg-red-500">
        <IoAdd className="tab-icon" size={20} color="var(--color-primary)" />
      </div>
    ),
    path: "/create-post",
  },
  {
    id: 5,
    label: "",
    icon: <IoNotificationsOutline className="tab-icon" />,
    activeIcon: <IoNotifications className="tab-icon" />,
    path: "/notification",
  },
  {
    id: 6,
    label: "",
    icon: <IoPersonOutline className="tab-icon" />,
    activeIcon: <IoPerson className="tab-icon" />,
    path: "/profile",
  },
];

// Use React.memo to prevent unnecessary re-renders
const BottomTab: React.FC = React.memo(() => {
  const location = useLocation();
  const currentPath = location.pathname;
  const user = useUserStore((state) => state.user);
  // Memoize the profile tab to prevent unnecessary re-renders
  const renderProfileTab = useMemo(() => {
    const isActive = currentPath === "/profile";
    const textActive = isActive ? "text-(--color-primary)" : "text-gray-500";

    return (
      <div key="profile-tab">
        <Link
          to="/profile"
          className={`tab-button ${isActive ? "active" : ""}`}
        >
          {user?.avatar ? (
            <Avatar variant="circle" size="sm" source={user?.avatar} />
          ) : (
            <AvatarPlaceholder variant="circle" className="tab-icon" />
          )}
        </Link>
      </div>
    );
  }, [currentPath, user?.avatar, user?.name]);

  return (
    <div className="bottom-tab">
      {tabs.map((tab) => {
        const isActive = currentPath === tab.path;

        // Render profile tab separately for consistency
        if (tab.path === "/profile") {
          return renderProfileTab;
        }

        return (
          <div key={tab.id}>
            <Link
              to={tab.path}
              className={`tab-button ${isActive ? "active" : ""}`}
            >
              {isActive ? tab.activeIcon : tab.icon}
              <span className="tab-label">{tab.label}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
});

export default BottomTab;
