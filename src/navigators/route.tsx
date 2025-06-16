import React from "react";
import { Route, Routes, Navigate } from "react-router";

const NotFoundPage: React.FC = () => (
  <div>
    <h1>Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
  </div>
);

import { MainPage } from "@/pages/MainPage";
import HomePage from "@/pages/HomePage";
import { CommunitiesPage } from "@/pages/Communities";
import { NotificationPage } from "@/pages/Notification";
import { ProfilePage } from "@/pages/ProfilePage";
import VerticalTransitionDemo from "@/pages/VerticalTransitionDemo";

// Define routes using createRoutesFromElements for React Router v7a
const router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/communities" element={<CommunitiesPage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/vertical-transition"
          element={<VerticalTransitionDemo />}
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

// Main App Router component

export default router;
