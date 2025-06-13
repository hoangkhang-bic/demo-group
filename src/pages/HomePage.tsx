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

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="ion-padding">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Welcome to Ionic React</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText>
                <p>
                  This is a sample home page built with Ionic components. The
                  header has been successfully refactored to use Ionic
                  components.
                </p>
                <p>
                  You can navigate to other pages using the icons in the header.
                </p>
              </IonText>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
