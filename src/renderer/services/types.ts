import { SnapshotIn, SnapshotOut } from "mobx-state-tree";
import { ProjectDefinition } from "renderer/models";
import { DefinitionEntry } from "renderer/models/stores/DefinitionEntry";

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

type PaginationArgs = {
  start: number;
  limit: number;
  query?: string;
};

export interface IpcDefinitionsService {
  saveDefinition(
    projectDefinition: SnapshotOut<typeof ProjectDefinition>
  ): Promise<IpcResult>;
  readDefinitions(
    args: PaginationArgs
  ): Promise<IpcResult<SnapshotIn<typeof DefinitionEntry>>>;
  readDefinition(
    projectDefinitionId: string
  ): Promise<IpcResult<SnapshotIn<typeof ProjectDefinition>>>;
  removeDefinition(projectDefinitionId: string): Promise<IpcResult>;
}
