import LandingPage from "@/pages/preview/LandingPage";
import { RouteArgs, RouteName, RouteProps } from "./types";
import DashBoardPage from "@/pages/dashboard/DashBoardPage";
import Login from "@/pages/auth/Login";

export const Routes: Array<RouteProps> = [
  {
    name: RouteName.LandingPage,
    path: "/",
    element: <LandingPage />,
    navPath: (args: RouteArgs) => {},
  },
  {
    name: RouteName.DashBoardPage,
    path: "/dashboard",
    element: <DashBoardPage />,
    navPath: (args: RouteArgs) => {},
  },
  {
    name: RouteName.Login,
    path: "/login",
    element: <Login />,
    navPath: (args: RouteArgs) => {},
  },
];
