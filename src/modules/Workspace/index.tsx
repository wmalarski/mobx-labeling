import { DefaultGenerics, Route } from "react-location";
import { Workspace } from "./Workspace";

export const workspaceRoute: Route<DefaultGenerics> = {
  path: ":workspaceId",
  element: <Workspace />,
};
