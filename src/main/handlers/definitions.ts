import { app, ipcMain } from "electron";
import { mkdir, readFile, rm, writeFile } from "fs/promises";
import path from "path";
import {
  IpcRendererChannel,
  IpcResult,
  PaginationArgs,
  ProjectDefinitionSnapshot,
} from "../types";

const appDataPath = path.join(app.getPath("userData"), "MobXLabeling");
const definitionsListPath = path.join(appDataPath, "definitions.json");

const makeDefinitionsDir = async (): Promise<void> => {
  try {
    await mkdir(appDataPath);
    const initial = JSON.stringify([]);
    await writeFile(definitionsListPath, initial, { flag: "wx" });
  } catch (err) {
    // Ignore already exists error
  }
};

const readDefinitionsList = async (): Promise<ProjectDefinitionSnapshot[]> => {
  const data = await readFile(definitionsListPath);
  return JSON.parse(data.toString());
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
    async (_event, snapshot: ProjectDefinitionSnapshot): Promise<IpcResult> => {
      try {
        await makeDefinitionsDir();

        const definitions = await readDefinitionsList();

        const entry = {
          description: snapshot.description,
          id: snapshot.id,
          name: snapshot.name,
          updatedAt: snapshot.updatedAt,
        };

        await Promise.all([
          writeDefinition(snapshot),
          writeDefinitionsList([...definitions, entry]),
        ]);
        return { state: "success" };
      } catch (error) {
        console.error(error);
        return { state: "failure", error };
      }
    }
  );
  ipcMain.handle(
    IpcRendererChannel.ReadDefinitions,
    async (
      _event,
      { limit, start, query }: PaginationArgs
    ): Promise<IpcResult<ProjectDefinitionSnapshot[]>> => {
      try {
        await makeDefinitionsDir();

        const definitions = await readDefinitionsList();

        const lower = query?.toLowerCase();

        const queried = !lower
          ? definitions
          : definitions.filter(({ name }) =>
              name.toLowerCase().includes(lower)
            );

        const data = queried.slice(start, start + limit);

        return { state: "success", data };
      } catch (error) {
        console.error(error);
        return { state: "failure", error };
      }
    }
  );
  ipcMain.handle(
    IpcRendererChannel.ReadDefinition,
    async (
      _event,
      projectDefinitionId: string
    ): Promise<IpcResult<ProjectDefinitionSnapshot>> => {
      try {
        await makeDefinitionsDir();

        const data = await readDefinition(projectDefinitionId);

        return { state: "success", data };
      } catch (error) {
        console.error(error);
        return { state: "failure", error };
      }
    }
  );
  ipcMain.handle(
    IpcRendererChannel.RemoveDefinition,
    async (_event, projectDefinitionId: string): Promise<IpcResult> => {
      try {
        await makeDefinitionsDir();

        const previousList = await readDefinitionsList();

        const filtered = previousList.filter(
          (entry) => entry.id !== projectDefinitionId
        );

        await Promise.all([
          removeDefinition(projectDefinitionId),
          writeDefinitionsList(filtered),
        ]);
        return { state: "success" };
      } catch (error) {
        console.error(error);
        return { state: "failure", error };
      }
    }
  );
};
