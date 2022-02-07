import { DefaultGenerics, Route } from "react-location";
import { groupRoute } from "../Group";
import { GroupsList } from "./GroupsList/GroupsList";
import { Home } from "./Home";

export const homeRoute: Route<DefaultGenerics> = {
  path: "/",
  element: <Home />,
  children: [{ path: "/", element: <GroupsList /> }, groupRoute],
};
