export type DefinitionSnapshot = {
  id: string;
  name: string;
  description: string;
  updatedAt: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type Resource = {
  id: string;
  path: string;
  fps: number;
  frameShift: number;
};

export type Range = {
  start: number;
  end: number;
};

export type Item = {
  id: string;
  ranges: Range[];
};

export type BatchInfo = {
  id: string;
  range: Range[];
};

export type Batch = {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type ProjectInfo = {
  id: string;
  name: string;
  projectPath: string;
  updatedAt: number;
  definition: string;
};

export type ProjectRoot = {
  id: string;
  name: string;
  projectPath: string;
  updatedAt: number;
  batchSize: number;
  resources: Resource[];
  items: Item[];
  batches: BatchInfo[];
  definition: DefinitionSnapshot;
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
