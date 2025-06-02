import {
  createBrowserRouter,
  type RouteObject,
  RouterProvider,
} from "react-router";
import App from "./App";
import appRouter from "./route/base-router";

const root = () => {
  const route: RouteObject[] = [
    //* default route app
    {
      path: "/",
      Component: App,
      children: appRouter,
    },
  ];
  const router = createBrowserRouter(route);
  return <RouterProvider router={router} />;
};
export default root;
