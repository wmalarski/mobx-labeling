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

export type IpcResult<TData = undefined> =
  | (TData extends undefined
      ? {
          state: "success";
        }
      : {
          state: "success";
          data: TData;
        })
  | {
      state: "failure";
      error: unknown;
    };

export type PaginationArgs = {
  start: number;
  limit: number;
  query?: string;
};
