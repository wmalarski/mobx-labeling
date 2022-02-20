export type ProjectDefinitionSnapshot = {
  id: string;
  name: string;
  description: string;
  updatedAt: number;
};

export enum IpcRendererChannel {
  WriteDefinition = "WriteDefinition",
  ReadDefinitions = "ReadDefinitions",
  ReadDefinition = "ReadDefinition",
  RemoveDefinition = "RemoveDefinition",
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
