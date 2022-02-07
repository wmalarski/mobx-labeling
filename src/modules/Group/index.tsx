import { DefaultGenerics, Route } from "react-location";
import { Group } from "./Group";

export const groupRoute: Route<DefaultGenerics> = {
  path: ":groupId",
  element: <Group />,
};
