import { ipcMain } from "electron";
import path from "path";
import {
  Batch,
  IpcRendererChannel,
  PaginationArgs,
  PaginationResult,
  ProjectInfo,
  ProjectRoot,
} from "../types";
import { appDataPath, makeAppDir } from "../util";

const recentListPath = path.join(appDataPath, "recent.json");

export const handleCreateProject = async (
  project: ProjectRoot
): Promise<void> => {
  // await makeAppDir();
  // const definitions = await readDefinitionsList();
  // const entry = {
  //   description: snapshot.description,
  //   id: snapshot.id,
  //   name: snapshot.name,
  //   updatedAt: snapshot.updatedAt,
  // };
  // const index = definitions.findIndex(
  //   (definition) => definition.id === entry.id
  // );
  // const updated = index < 0 ? [entry, ...definitions] : definitions;
  // if (index >= 0) {
  //   updated[index] = entry;
  // }
  // await Promise.all([
  //   writeDefinition(snapshot),
  //   writeDefinitionsList(updated),
  // ]);
  return Promise.reject("failure");
};

export const handleReadProject = async (
  projectPath: string
): Promise<ProjectRoot> => {
  await makeAppDir();

  // const entries = await readDefinitionsList();

  // const lower = query?.toLowerCase();

  // const queried = !lower
  //   ? entries
  //   : entries.filter(({ name }) => name.toLowerCase().includes(lower));

  // const data = queried.slice(start, start + limit);

  return Promise.reject("failure");
};

export const handleReadBatch = async (
  projectPath: string,
  batchId: string
): Promise<Batch> => {
  await makeAppDir();

  // const data = await readDefinition(projectDefinitionId);

  // return data;

  return Promise.reject("failure");
};

export const handleUpdateBatch = async (
  projectId: string,
  batchId: string,
  batch: Batch
): Promise<void> => {
  await makeAppDir();

  // const previousList = await readDefinitionsList();

  // const filtered = previousList.filter(
  //   (entry) => entry.id !== projectDefinitionId
  // );

  // await Promise.all([
  //   removeDefinition(projectDefinitionId),
  //   writeDefinitionsList(filtered),
  // ]);

  return Promise.reject("failure");
};

export const handleReadProjects = async ({
  limit,
  start,
  query,
}: PaginationArgs): Promise<PaginationResult<ProjectInfo>> => {
  await makeAppDir();

  // const previousList = await readDefinitionsList();

  // const filtered = previousList.filter(
  //   (entry) => entry.id !== projectDefinitionId
  // );

  // await Promise.all([
  //   removeDefinition(projectDefinitionId),
  //   writeDefinitionsList(filtered),
  // ]);

  return Promise.reject("failure" + start);
};

export const setupProjectHandles = () => {
  ipcMain.handle(
    IpcRendererChannel.CreateProject,
    async (_event, project: ProjectRoot): Promise<void> => {
      return handleCreateProject(project);
    }
  );
  ipcMain.handle(
    IpcRendererChannel.ReadProject,
    async (_event, projectPath: string): Promise<ProjectRoot> => {
      return handleReadProject(projectPath);
    }
  );
  ipcMain.handle(
    IpcRendererChannel.ReadBatch,
    async (
      _event: Electron.IpcMainInvokeEvent,
      projectPath: string,
      batchId: string
    ): Promise<Batch> => {
      return handleReadBatch(projectPath, batchId);
    }
  );
  ipcMain.handle(
    IpcRendererChannel.UpdateBatch,
    async (
      _event: Electron.IpcMainInvokeEvent,
      projectId: string,
      batchId: string,
      batch: Batch
    ): Promise<void> => {
      return handleUpdateBatch(projectId, batchId, batch);
    }
  );
  ipcMain.handle(
    IpcRendererChannel.ReadProjects,
    async (
      _event: Electron.IpcMainInvokeEvent,
      args: PaginationArgs
    ): Promise<PaginationResult<ProjectInfo>> => {
      return handleReadProjects(args);
    }
  );
};
