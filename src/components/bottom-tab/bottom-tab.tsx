import React from "react";
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import {
  homeOutline,
  searchOutline,
  notificationsOutline,
  personOutline,
} from "ionicons/icons";
import "./bottom-tab.css";

interface TabItem {
  label: string;
  icon: string;
  path: string;
}

const tabs: TabItem[] = [
  {
    label: "Home",
    icon: homeOutline,
    path: "/home",
  },
  {
    label: "Search",
    icon: searchOutline,
    path: "/search",
  },
  {
    label: "Notifications",
    icon: notificationsOutline,
    path: "/notifications",
  },
  {
    label: "Profile",
    icon: personOutline,
    path: "/profile",
  },
];

const BottomTab: React.FC = () => {
  return (
    <IonTabBar slot="bottom" className="bottom-tab">
      {tabs.map((tab, index) => (
        <IonTabButton
          key={index}
          tab={tab.path}
          href={tab.path}
          className="tab-button"
        >
          <IonIcon icon={tab.icon} className="tab-icon" />
          <IonLabel className="tab-label">{tab.label}</IonLabel>
        </IonTabButton>
      ))}
    </IonTabBar>
  );
};

export default BottomTab;
