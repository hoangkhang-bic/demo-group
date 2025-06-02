import App from "../App";
import AdminPanel from "@pages/admin-panel";

const appRouter = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/admin-pannel/:idCommunity",
        element: <AdminPanel />,
        children: [
          {
            path: "/admin-pannel/:idCommunity/dashboard",
            element: <div>dashboard</div>,
          },
          {
            path: "/admin-pannel/:idCommunity/user-management",
            element: <div>user-management</div>,
          },
          {
            path: "/admin-pannel/:idCommunity/com-activity-log",
            element: <div>post-management</div>,
          },
          {
            path: "/admin-pannel/:idCommunity/content-approval",
            children: [
              {
                path: "/admin-pannel/:idCommunity/content-approval/pending",
                element: <div>post</div>,
              },
            ],
          },
          {
            path: "/admin-pannel/:idCommunity/profile-setting",
            element: <div>profile-setting</div>,
          },
          {
            path: "/admin-pannel/:idCommunity/permission",
            element: <div>permission</div>,
          },
          {
            path: "/admin-pannel/:idCommunity/badges",
            element: <div>notification</div>,
          },
        ],
      },
    ],
  },
];

export default appRouter;
