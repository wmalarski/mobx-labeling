import AdmZip from "adm-zip";
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

export const recentListPath = path.join(appDataPath, "recent.json");
const rootFilename = "root.json";
const corruptedMessage = "File corrupted";

const batchFilename = (batchId: string): string => {
  return `batch-${batchId}.json`;
};

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
  await makeAppDir();
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
  await updateRecentList(project);

  const zip = new AdmZip();

  const buffer = Buffer.from(JSON.stringify(project));
  zip.addFile(rootFilename, buffer);

  zip.writeZip(project.projectPath);
};

export const handleReadProject = async (
  projectPath: string
): Promise<ProjectRoot> => {
  const zip = new AdmZip(projectPath);

  const root = zip.getEntry(rootFilename);

  if (!root) {
    return Promise.reject(corruptedMessage);
  }

  const buffer = root.getData();
  const project: ProjectRoot = JSON.parse(buffer.toString());

  await updateRecentList(project);

  return project;
};

export const handleReadBatch = async (
  projectPath: string,
  batchId: string
): Promise<Batch> => {
  const zip = new AdmZip(projectPath);
  const entry = zip.getEntry(batchFilename(batchId));

  if (!entry) {
    return Promise.reject(corruptedMessage);
  }

  const buffer = entry.getData();
  const batch: Batch = JSON.parse(buffer.toString());

  return batch;
};

export const handleUpdateBatch = async (
  projectPath: string,
  batchId: string,
  batch: Batch
): Promise<void> => {
  const zip = new AdmZip(projectPath);

  const buffer = Buffer.from(JSON.stringify(batch));

  zip.updateFile(batchFilename(batchId), buffer);
};

export const handleReadProjects = async ({
  limit,
  start,
  query,
}: PaginationArgs): Promise<PaginationResult<ProjectInfo[]>> => {
  const entries = await readRecentList();

  const lower = query?.toLowerCase();

  const queried = !lower
    ? entries
    : entries.filter(({ name }) => name.toLowerCase().includes(lower));

  const data = queried.slice(start, start + limit);

  return { data, totalSize: queried.length };
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
    ): Promise<PaginationResult<ProjectInfo[]>> => {
      return handleReadProjects(args);
    }
  );
};
