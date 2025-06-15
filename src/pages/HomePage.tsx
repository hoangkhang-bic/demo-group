import React from "react";
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
} from "@ionic/react";
import Page from "@/components/page/page";
import TopHeader from "@/components/bic-components/top-header/top-header";
import View from "@/components/View/View";

const HomePage: React.FC = () => {
  return (
    <Page fullscreen>
      <TopHeader />
    </Page>
  );
};

export default HomePage;
