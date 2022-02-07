import { DefaultGenerics, Route } from "react-location";
import { workspaceRoute } from "../Workspace";
import { Workspaces } from "./Workspaces";
import { WorkspacesList } from "./WorkspacesList/WorkspacesList";

export const workspacesRoute: Route<DefaultGenerics> = {
  path: "/workspaces",
  element: <Workspaces />,
  children: [{ path: "/", element: <WorkspacesList /> }, workspaceRoute],
};
