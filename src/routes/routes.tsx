import LandingPage from "@/pages/preview/LandingPage";
import { RouteArgs, RouteName, RouteProps } from "./types";
import DashBoardPage from "@/pages/dashboard/DashBoardPage";
import Login from "@/pages/auth/Login";

export const Routes: Array<RouteProps> = [
  {
    name: RouteName.LandingPage,
    path: "/",
    element: <LandingPage />,
    getRoutePath: (args: RouteArgs) => {},
  },
  {
    name: RouteName.DashBoardPage,
    path: "/dashboard",
    element: <DashBoardPage />,
    getRoutePath: (args: RouteArgs) => {},
  },
  {
    name: RouteName.Login,
    path: "/login",
    element: <Login />,
    getRoutePath: (args: RouteArgs) => {
        if(args?.url){
            return `/login?url=${args?.url}`
        }
    },
  },
];
