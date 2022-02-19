import { SnapshotIn, SnapshotOut } from "mobx-state-tree";
import { ProjectDefinition } from "renderer/models";
import { DefinitionEntry } from "renderer/models/stores/DefinitionEntry";

type PaginationArgs = {
  start: number;
  limit: number;
  query?: string;
};

export interface IpcDefinitionsService {
  saveDefinition(
    projectDefinition: SnapshotOut<typeof ProjectDefinition>
  ): Promise<void>;
  readDefinitions(
    args: PaginationArgs
  ): Promise<SnapshotIn<typeof DefinitionEntry>>;
  readDefinition(
    projectDefinitionId: string
  ): Promise<SnapshotIn<typeof ProjectDefinition>>;
  removeDefinition(projectDefinitionId: string): Promise<void>;
}
