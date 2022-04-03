export type DefinitionSnapshot = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  description: string;
  id: string;
  name: string;
  updatedAt: number;
};

export type Resource = {
  fps: number;
  frameShift: number;
  id: string;
  path: string;
};

export type Range = {
  end: number;
  start: number;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  id: string;
};

export type ProjectInfo = {
  definition: string;
  id: string;
  name: string;
  projectPath: string;
  updatedAt: number;
};

export type ProjectRoot = {
  batches: BatchInfo[];
  batchSize: number;
  definition: DefinitionSnapshot;
  id: string;
  items: Item[];
  name: string;
  projectPath: string;
  resources: Resource[];
  updatedAt: number;
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
  limit: number;
  query?: string;
  start: number;
};

export type PaginationResult<TData> = {
  data: TData;
  totalSize: number;
};
