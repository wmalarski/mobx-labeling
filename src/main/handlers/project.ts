import { ipcMain } from "electron";
import { readFile, writeFile } from "fs/promises";
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

const readRecentList = async (): Promise<ProjectInfo[]> => {
  try {
    const data = await readFile(recentListPath);
    return JSON.parse(data.toString());
  } catch (err) {
    return [];
  }
};

const writeRecentList = async (data: ProjectInfo[]): Promise<void> => {
  const json = JSON.stringify(data);
  await writeFile(recentListPath, json);
};

const updateRecentList = async (project: ProjectRoot): Promise<void> => {
  const recent = await readRecentList();

  const info: ProjectInfo = {
    definition: project.definition.name,
    id: project.id,
    name: project.name,
    projectPath: project.projectPath,
    updatedAt: project.updatedAt,
  };

  const index = recent.findIndex((entry) => entry.id === info.id);

  const updated = index < 0 ? [info, ...recent] : recent;
  if (index >= 0) {
    updated[index] = info;
  }

  await writeRecentList(updated);
};

export const handleCreateProject = async (
  project: ProjectRoot
): Promise<void> => {
  console.log("handleCreateProject", recentListPath, project);
  await makeAppDir();

  await updateRecentList(project);

  // await Promise.all([
  //   writeDefinition(snapshot),
  //   writeDefinitionsList(updated),
  // ]);
  // return Promise.("failure");
};

export const handleReadProject = async (
  projectPath: string
): Promise<ProjectRoot> => {
  await makeAppDir();
  console.log("handleReadProject", recentListPath, projectPath);
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
  console.log("handleReadBatch", projectPath, batchId);
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
  console.log("handleUpdateBatch", projectId, batchId, batch);
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
  console.log("handleReadProjects", limit, start, query);
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
