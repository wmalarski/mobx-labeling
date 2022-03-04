import { ipcMain } from "electron";
import path from "path";
import {
  IpcRendererChannel,
  PaginationArgs,
  PaginationResult,
  ProjectDefinitionSnapshot,
  ProjectRoot,
} from "../types";
import { appDataPath, makeDefinitionsDir } from "../util";

const recentListPath = path.join(appDataPath, "recent.json");

export const setupProjectHandles = () => {
  ipcMain.handle(
    IpcRendererChannel.CreateProject,
    async (_event, project: ProjectRoot): Promise<void> => {
      await makeDefinitionsDir();

      const definitions = await readDefinitionsList();

      const entry = {
        description: snapshot.description,
        id: snapshot.id,
        name: snapshot.name,
        updatedAt: snapshot.updatedAt,
      };

      const index = definitions.findIndex(
        (definition) => definition.id === entry.id
      );

      const updated = index < 0 ? [entry, ...definitions] : definitions;

      if (index >= 0) {
        updated[index] = entry;
      }

      await Promise.all([
        writeDefinition(snapshot),
        writeDefinitionsList(updated),
      ]);
    }
  );
  ipcMain.handle(
    IpcRendererChannel.ReadProject,
    async (
      _event,
      { limit, start, query }: PaginationArgs
    ): Promise<PaginationResult<ProjectDefinitionSnapshot[]>> => {
      await makeDefinitionsDir();

      const entries = await readDefinitionsList();

      const lower = query?.toLowerCase();

      const queried = !lower
        ? entries
        : entries.filter(({ name }) => name.toLowerCase().includes(lower));

      const data = queried.slice(start, start + limit);

      return { data, totalSize: queried.length };
    }
  );
  ipcMain.handle(
    IpcRendererChannel.ReadBatch,
    async (
      _event,
      projectDefinitionId: string
    ): Promise<ProjectDefinitionSnapshot> => {
      await makeDefinitionsDir();

      const data = await readDefinition(projectDefinitionId);

      return data;
    }
  );
  ipcMain.handle(
    IpcRendererChannel.UpdateBatch,
    async (_event, projectDefinitionId: string): Promise<void> => {
      await makeDefinitionsDir();

      const previousList = await readDefinitionsList();

      const filtered = previousList.filter(
        (entry) => entry.id !== projectDefinitionId
      );

      await Promise.all([
        removeDefinition(projectDefinitionId),
        writeDefinitionsList(filtered),
      ]);
    }
  );
  ipcMain.handle(
    IpcRendererChannel.ReadProjects,
    async (_event, projectDefinitionId: string): Promise<void> => {
      await makeDefinitionsDir();

      const previousList = await readDefinitionsList();

      const filtered = previousList.filter(
        (entry) => entry.id !== projectDefinitionId
      );

      await Promise.all([
        removeDefinition(projectDefinitionId),
        writeDefinitionsList(filtered),
      ]);
    }
  );
};
