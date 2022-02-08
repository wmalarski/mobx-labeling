import {
  createMemoryHistory,
  MakeGenerics,
  ReactLocation,
  Route,
} from "react-location";
import { Definition } from "../modules/Definition/Definition";
import { Definitions } from "../modules/Definitions/Definitions";
import { Home } from "../modules/Home/Home";
import { NewProject } from "../modules/NewProject/NewProject";
import { Workspace } from "../modules/Workspace/Workspace";

export const routePaths = {
  home: "/",
  newProject: "/new-project",
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

const memoryHistory = createMemoryHistory("/");

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
