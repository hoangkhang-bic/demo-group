import React from "react";
import { Route, Routes, Navigate } from "react-router";
import NotFoundPage from "@pages/NotFoundPage";

import { MainPage } from "@pages/MainPage";
import HomePage from "@pages/HomePage/HomePage";
import CommunitiesPage from "@pages/CommunitiesPage/Communities";
import { NotificationPage } from "@pages/Notification";
import { ProfilePage } from "@pages/ProfilePage";
import VerticalTransitionDemo from "@pages/VerticalTransitionDemo";
import FacebookDemo from "@pages/FacebookDemo/FacebookDemo";

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
        <Route path="/facebook-demo" element={<FacebookDemo />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

// Main App Router component

export default router;
