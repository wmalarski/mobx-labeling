import type {
  IpcRendererEvent,
  OpenDialogOptions,
  OpenDialogReturnValue,
  SaveDialogOptions,
  SaveDialogReturnValue,
} from "electron/renderer";
import { SnapshotIn, SnapshotOut } from "mobx-state-tree";
import {
  Batch,
  DefinitionEntry,
  ProjectDefinition,
  ProjectEntry,
  ProjectRoot,
} from "renderer/models";

type PaginationArgs = {
  start: number;
  limit: number;
  query?: string;
};

type PaginationResult<TData> = {
  data: TData;
  totalSize: number;
};

export type IpcDefinitionsService = {
  saveDefinition(
    projectDefinition: SnapshotOut<typeof ProjectDefinition>
  ): Promise<void>;
  readDefinitions(
    args: PaginationArgs
  ): Promise<PaginationResult<SnapshotIn<typeof DefinitionEntry>[]>>;
  readDefinition(
    projectDefinitionId: string
  ): Promise<SnapshotIn<typeof ProjectDefinition>>;
  removeDefinition(projectDefinitionId: string): Promise<void>;
};

export type IpcResourcesService = {
  openDialog(options: OpenDialogOptions): void;
  addOnOpenListener(
    callback: (event: IpcRendererEvent, value: OpenDialogReturnValue) => void
  ): void;
  removeOnOpenListener(
    callback: (event: IpcRendererEvent, value: OpenDialogReturnValue) => void
  ): void;
  saveDialog(options: SaveDialogOptions): void;
  addOnSaveListener(
    callback: (event: IpcRendererEvent, value: SaveDialogReturnValue) => void
  ): void;
  removeOnSaveListener(
    callback: (event: IpcRendererEvent, value: SaveDialogReturnValue) => void
  ): void;
};

export type IpcProjectService = {
  createProject(project: ProjectRoot): Promise<void>;
  readProject(projectPath: string): Promise<ProjectRoot>;
  readBatch(args: {
    projectPath: string;
    batchId: string;
  }): Promise<SnapshotIn<typeof Batch>>;
  updateBatch(args: {
    projectPath: string;
    batchId: string;
    batch: SnapshotOut<typeof Batch>;
  }): Promise<void>;
  readProjects(
    args: PaginationArgs
  ): Promise<PaginationResult<SnapshotIn<typeof ProjectEntry>[]>>;
};

export type ElectronServices = {
  ipcDefinitions: IpcDefinitionsService;
  ipcResources: IpcResourcesService;
  ipcProject: IpcProjectService;
};
