import {
  createMemoryHistory,
  MakeGenerics,
  ReactLocation,
  Route,
} from "react-location";
import { NewDefinition } from "renderer/modules/NewDefinition/NewDefinition";
import { Definition } from "../modules/Definition/Definition";
import { Definitions } from "../modules/Definitions/Definitions";
import { Home } from "../modules/Home/Home";
import { NewProject } from "../modules/NewProject/NewProject";
import { Workspace } from "../modules/Workspace/Workspace";

export const routePaths = {
  home: "/",
  newProject: "/new-project",
  newDefinition: "/new-definition",
  definitions: "/definitions",
  definition: (definitionId: string): string => `/definition/${definitionId}`,
  workspace: "/workspace",
};

export type LocationGenerics = MakeGenerics<{
  Params: {
    definitionId: string;
  };
  Search: {
    project: string;
  };
}>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const memoryHistory = (createMemoryHistory as any)("/");

export const location = new ReactLocation<LocationGenerics>({
  history: memoryHistory,
});

export const routes: Route<LocationGenerics>[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "new-project",
    element: <NewProject />,
  },
  {
    path: "new-definition",
    element: <NewDefinition />,
  },
  {
    path: "definitions",
    element: <Definitions />,
  },
  {
    path: "definition/:definitionId",
    element: <Definition />,
  },
  {
    path: "workspace",
    element: <Workspace />,
  },
];
