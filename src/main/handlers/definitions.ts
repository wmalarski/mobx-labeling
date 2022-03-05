import { ipcMain } from "electron";
import { readFile, rm, writeFile } from "fs/promises";
import path from "path";
import {
  DefinitionSnapshot,
  IpcRendererChannel,
  PaginationArgs,
  PaginationResult,
} from "../types";
import { appDataPath, makeAppDir } from "../util";

const definitionsListPath = path.join(appDataPath, "definitions.json");

const readDefinitionsList = async (): Promise<DefinitionSnapshot[]> => {
  try {
    const data = await readFile(definitionsListPath);
    return JSON.parse(data.toString());
  } catch (err) {
    return [];
  }
};

const writeDefinitionsList = async (
  data: DefinitionSnapshot[]
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
): Promise<DefinitionSnapshot> => {
  const definitionPath = getDefinitionFilename(projectDefinitionId);
  const data = await readFile(definitionPath);
  return JSON.parse(data.toString());
};

const writeDefinition = async (data: DefinitionSnapshot): Promise<void> => {
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
    async (_event, snapshot: DefinitionSnapshot): Promise<void> => {
      await makeAppDir();

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
    ): Promise<PaginationResult<DefinitionSnapshot[]>> => {
      await makeAppDir();

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
    ): Promise<DefinitionSnapshot> => {
      await makeAppDir();

      const data = await readDefinition(projectDefinitionId);

      return data;
    }
  );
  ipcMain.handle(
    IpcRendererChannel.RemoveDefinition,
    async (_event, projectDefinitionId: string): Promise<void> => {
      await makeAppDir();

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
