import React from "react";
import { IonReactRouter } from "@ionic/react-router";
import { IonRouterOutlet, IonApp, IonPage, IonContent } from "@ionic/react";
import { Route, Navigate } from "react-router-dom";
import BeincomHeader from "@components/bic-components/top-header/top-header";
import HomePage from "@/pages/HomePage";

const CommunityPage: React.FC = () => (
  <IonPage>
    <BeincomHeader />
    <IonContent className="ion-padding">
      <h1>Community Page</h1>
      <p>Connect with other users</p>
    </IonContent>
  </IonPage>
);

const DeliveryPage: React.FC = () => (
  <IonPage>
    <BeincomHeader />
    <IonContent className="ion-padding">
      <h1>Delivery Page</h1>
      <p>Track your deliveries</p>
    </IonContent>
  </IonPage>
);

const ProfilePage: React.FC = () => (
  <IonPage>
    <BeincomHeader />
    <IonContent className="ion-padding">
      <h1>Profile Page</h1>
      <p>Your account information</p>
    </IonContent>
  </IonPage>
);

const WalletPage: React.FC = () => (
  <IonPage>
    <BeincomHeader />
    <IonContent className="ion-padding">
      <h1>Wallet Page</h1>
      <p>Manage your funds</p>
    </IonContent>
  </IonPage>
);

const NotFoundPage: React.FC = () => (
  <IonPage>
    <BeincomHeader />
    <IonContent className="ion-padding">
      <h1>Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </IonContent>
  </IonPage>
);

// Main App Router component with Ionic Router
export const AppRouter: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Define all specific routes first */}
        <Route path="/" Component={HomePage} />
        {/* This will catch any unmatched routes */}
        <Route>
          <Navigate to="/not-found" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default AppRouter;
