import { app, ipcMain } from "electron";
import { mkdir, readFile, rm, writeFile } from "fs/promises";
import path from "path";
import {
  IpcRendererChannel,
  PaginationArgs,
  PaginationResult,
  ProjectDefinitionSnapshot,
} from "../types";

const appDataPath = path.join(app.getPath("userData"), "MobXLabeling");
const definitionsListPath = path.join(appDataPath, "definitions.json");

const makeDefinitionsDir = async (): Promise<void> => {
  try {
    await mkdir(appDataPath);
  } catch (err) {
    // Ignore already exists error
  }
};

const readDefinitionsList = async (): Promise<ProjectDefinitionSnapshot[]> => {
  try {
    const data = await readFile(definitionsListPath);
    return JSON.parse(data.toString());
  } catch (err) {
    return [];
  }
};

const writeDefinitionsList = async (
  data: ProjectDefinitionSnapshot[]
): Promise<void> => {
  const json = JSON.stringify(data);
  await writeFile(definitionsListPath, json);
};

const getDefinitionFilename = (projectDefinitionId: string): string => {
  const filename = `${projectDefinitionId}.json`;
  return path.join(appDataPath, filename);
};

const readDefinition = async (
  projectDefinitionId: string
): Promise<ProjectDefinitionSnapshot> => {
  const definitionPath = getDefinitionFilename(projectDefinitionId);
  const data = await readFile(definitionPath);
  return JSON.parse(data.toString());
};

const writeDefinition = async (
  data: ProjectDefinitionSnapshot
): Promise<void> => {
  const json = JSON.stringify(data);
  const definitionPath = getDefinitionFilename(data.id);
  await writeFile(definitionPath, json);
};

const removeDefinition = async (projectDefinitionId: string): Promise<void> => {
  const definitionPath = getDefinitionFilename(projectDefinitionId);
  await rm(definitionPath);
};

export const setupDefinitionsHandles = () => {
  ipcMain.handle(
    IpcRendererChannel.WriteDefinition,
    async (_event, snapshot: ProjectDefinitionSnapshot): Promise<void> => {
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
    IpcRendererChannel.ReadDefinitions,
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
    IpcRendererChannel.ReadDefinition,
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
    IpcRendererChannel.RemoveDefinition,
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
