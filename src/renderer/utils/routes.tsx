import { SnapshotIn } from "mobx-state-tree";
import {
  createMemoryHistory,
  MakeGenerics,
  ReactLocation,
  Route,
} from "react-location";
import { Batch, ProjectDefinition, ProjectRoot } from "renderer/models";
import { NewDefinition } from "renderer/pages/NewDefinition/NewDefinition";
import { Definition } from "../pages/Definition/Definition";
import { Definitions } from "../pages/Definitions/Definitions";
import { Home } from "../pages/Home/Home";
import { NewProject } from "../pages/NewProject/NewProject";
import { Workspace } from "../pages/Workspace/Workspace";

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
    projectDefinition: SnapshotIn<typeof ProjectDefinition>;
    project: ProjectRoot;
    batch: SnapshotIn<typeof Batch>;
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
    loader: async ({ search }) => {
      if (!search.project) {
        throw new Error("Project not defined");
      }

      const project = await window.electron.ipcProject.readProject(
        search.project
      );

      const batchId = project.batches.at(0)?.id;

      if (!batchId) return { project };

      const batch = await window.electron.ipcProject.readBatch({
        projectPath: search.project,
        batchId,
      });

      return { project, batch };
    },
  },
];
