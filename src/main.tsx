import { Capacitor } from "@capacitor/core";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SplashScreen } from "@capacitor/splash-screen";
import "tailwindcss";

document.addEventListener("DOMContentLoaded", () => {
  console.log("App running on:", Capacitor.getPlatform());

  const container = document.getElementById("root");
  if (container) {
    console.log("Container found 111");
    // Use type assertion to resolve the TypeScript error
    SplashScreen.hide();
    ReactDOM.createRoot(container).render(<App />);
  } else {
    console.log("Container not found");
    ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
  }
});
