import * as React from "react";

export enum RouteName {
  LandingPage,
  DashBoardPage,
  Login,
  SignUp
}

export type RouteProps = {
  name: RouteName;
  path: string;
  element?: React.ReactNode;
  getRoutePath: (args: RouteArgs) => void;
};

export type RouteArgs = {
    url?:string
};
