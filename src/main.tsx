import { Capacitor } from "@capacitor/core";
import ReactDOM from "react-dom";
import App from "./App";

// Setup Ionic
import { setupIonicReact } from "@ionic/react";

// Call setupIonicReact before rendering
setupIonicReact({
  mode: "md", // Use Material Design style for all platforms
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("App running on:", Capacitor.getPlatform());

  const container = document.getElementById("root");
  if (container) {
    // Use type assertion to resolve the TypeScript error
    (ReactDOM as any).render(<App />, container);
  }
});
