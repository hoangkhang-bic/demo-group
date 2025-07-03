import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/* Theme variables */
import "./css/style.css";
/* Import our router */
import AppRouter from "@navigators/route";
import { BrowserRouter } from "react-router";
import SafeAreaView from "./components/seft-area-view/seft-area-view";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App: React.FC = () => {
  const [showSheet, setShowSheet] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
