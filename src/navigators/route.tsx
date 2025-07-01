import React from "react";
import { Route, Routes, Navigate } from "react-router";
import NotFoundPage from "@pages/NotFoundPage";

import { MainPage } from "@pages/MainPage";
import HomePage from "@pages/HomePage/HomePage";
import { NotificationPage } from "@pages/Notification";
import { ProfilePage } from "@pages/ProfilePage";
import VerticalTransitionDemo from "@pages/VerticalTransitionDemo";
import FacebookDemo from "@pages/FacebookDemo/FacebookDemo";
import { PinCommunities } from "@pages/PinCommunities/pin-communities";
import CreateCommunityPage from "@pages/CreateCommunityPage/CreateCommunityPage";
import CommunitiesDetail from "@pages/CommunitiesDetail/communities-detail";
import Communities from "@pages/CommunitiesPage/Communities";
import GroupDetail from "@/pages/Groups/GroupDetail";
import Groups from "@/pages/GroupsPage/GroupPage.mb";

// Define routes using createRoutesFromElements for React Router v7a
const router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route
          path="/vertical-transition"
          element={<VerticalTransitionDemo />}
        />
        <Route path="/facebook-demo" element={<FacebookDemo />} />
      </Route>
      <Route path="/pin-communities" element={<PinCommunities />} />
      <Route path="/create-community" element={<CreateCommunityPage />} />
      <Route path="/communities/:id" element={<CommunitiesDetail />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/groups/:id" element={<GroupDetail />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

// Main App Router component

export default router;
