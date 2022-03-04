export type ProjectDefinitionSnapshot = {
  id: string;
  name: string;
  description: string;
  updatedAt: number;
};

export type Resource = {
  id: string;
  path: string;
  fps: number;
  frameShift: number;
};

export type ProjectRoot = {
  projectPath: string;
  updatedAt: number;
  batchSize: number;
  resources: Resource[];
};

export enum IpcRendererChannel {
  WriteDefinition = "WriteDefinition",
  ReadDefinitions = "ReadDefinitions",
  ReadDefinition = "ReadDefinition",
  RemoveDefinition = "RemoveDefinition",
  OpenDialog = "OpenDialog",
  SaveDialog = "SaveDialog",
  CreateProject = "CreateProject",
  ReadProject = "ReadProject",
  ReadBatch = "ReadBatch",
  UpdateBatch = "UpdateBatch",
  ReadProjects = "ReadProjects",
}

export type PaginationArgs = {
  start: number;
  limit: number;
  query?: string;
};

export type PaginationResult<TData> = {
  data: TData;
  totalSize: number;
};
