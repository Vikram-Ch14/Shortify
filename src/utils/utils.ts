import { Routes } from "@/routes/routes";
import { RouteName, RouteProps } from "@/routes/types";

export const getRoute = (routeName: RouteName) => {
  const searchRoute = Routes?.find(
    (route: RouteProps) => route?.name === routeName
  );
  return searchRoute;
}
