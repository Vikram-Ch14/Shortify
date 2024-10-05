import * as React from "react";

export enum RouteName {
  LandingPage,
  DashBoardPage,
  Login
}

export type RouteProps = {
  name: RouteName;
  path: string;
  element?: React.ReactNode;
  navPath: (args: RouteArgs) => void;
};

export type RouteArgs = {};
