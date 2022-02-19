import { SnapshotOut } from "mobx-state-tree";
import { ProjectDefinition } from "renderer/models";

export {};

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        saveDefinition(
          projectDefinition: SnapshotOut<typeof ProjectDefinition>
        ): Promise<void>;
      };
    };
  }
}
