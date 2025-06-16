import { Capacitor } from "@capacitor/core";
import ReactDOM from "react-dom/client";
import App from "./App";

document.addEventListener("DOMContentLoaded", () => {
  console.log("App running on:", Capacitor.getPlatform());

  const container = document.getElementById("root");
  if (container) {
    // Use type assertion to resolve the TypeScript error
    ReactDOM.createRoot(container).render(<App />);
  }
});
