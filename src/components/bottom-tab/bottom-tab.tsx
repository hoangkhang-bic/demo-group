import React from "react";
import {
  IoHomeOutline,
  IoSearchOutline,
  IoNotificationsOutline,
  IoPersonOutline,
  IoHome,
  IoSearch,
  IoNotifications,
  IoPerson,
} from "react-icons/io5";
import { Link, useLocation } from "react-router";
import "./bottom-tab.css";

interface TabItem {
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  path: string;
}

const tabs: TabItem[] = [
  {
    label: "Home",
    icon: <IoHomeOutline className="tab-icon" />,
    activeIcon: <IoHome className="tab-icon" />,
    path: "/home",
  },
  {
    label: "Communities",
    icon: <IoSearchOutline className="tab-icon" />,
    activeIcon: <IoSearch className="tab-icon" />,
    path: "/communities",
  },
  {
    label: "Notifications",
    icon: <IoNotificationsOutline className="tab-icon" />,
    activeIcon: <IoNotifications className="tab-icon" />,
    path: "/notification",
  },
  {
    label: "Profile",
    icon: <IoPersonOutline className="tab-icon" />,
    activeIcon: <IoPerson className="tab-icon" />,
    path: "/profile",
  },
];

const BottomTab: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="bottom-tab">
      {tabs.map((tab, index) => {
        const isActive = currentPath === tab.path;
        return (
          <Link
            key={index}
            to={tab.path}
            className={`tab-button ${isActive ? "active" : ""}`}
          >
            {isActive ? tab.activeIcon : tab.icon}
            <span className="tab-label">{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomTab;
