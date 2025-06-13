import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonContent,
  IonBadge,
  IonAvatar,
  IonMenuButton,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import {
  searchOutline,
  homeOutline,
  peopleOutline,
  carOutline,
  notificationsOutline,
  chatbubbleOutline,
  walletOutline,
  menuOutline,
  closeOutline,
  gameControllerOutline,
  earthOutline,
  trophyOutline,
} from "ionicons/icons";
import DarkModeToggle from "./DarkModeToggle";

export default function BeincomHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <DarkModeToggle />
    </>
  );
}
