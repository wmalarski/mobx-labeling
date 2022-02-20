import { SnapshotIn } from "mobx-state-tree";
import {
  createMemoryHistory,
  MakeGenerics,
  ReactLocation,
  Route,
} from "react-location";
import { ProjectDefinition } from "renderer/models";
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
    definitionId: string;
  };
  LoaderData: {
    projectDefinition?: SnapshotIn<typeof ProjectDefinition>;
  };
}>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const memoryHistory = (createMemoryHistory as any)("/");

export const location = new ReactLocation<LocationGenerics>({
  history: memoryHistory,
});

export const routes = (): Route<LocationGenerics>[] => [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "new-project",
    element: <NewProject />,
    loader: async ({ search: { definitionId } }) => {
      const projectDefinition =
        definitionId && definitionId !== ""
          ? await window.electron.ipcDefinitions.readDefinition(definitionId)
          : undefined;
      return { projectDefinition };
    },
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
    loader: async ({ params: { definitionId } }) => {
      const projectDefinition =
        await window.electron.ipcDefinitions.readDefinition(definitionId);
      return { projectDefinition };
    },
  },
  {
    path: "workspace",
    element: <Workspace />,
  },
];
