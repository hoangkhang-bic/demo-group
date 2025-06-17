import React, { useState } from "react";

/* Theme variables */
import "./css/style.css";
/* Import our router */
import AppRouter from "@navigators/route";
import { BrowserRouter } from "react-router";

const App: React.FC = () => {
  const [showSheet, setShowSheet] = useState(false);
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
};

export default App;
