import { flow, getSnapshot, types } from "mobx-state-tree";
import { FetchState } from "../common/FetchState";
import { ProjectDefinition } from "../definition/ProjectDefinition/ProjectDefinition";

export const DefinitionStore = types
  .model("DefinitionStore", {
    projectDefinition: ProjectDefinition,
    state: FetchState,
  })
  .actions((self) => ({
    save: flow(function* () {
      self.state = "pending";
      try {
        const snapshot = getSnapshot(self.projectDefinition);
        yield window.electron.ipcDefinitions.saveDefinition(snapshot);
        self.state = "done";
      } catch (error) {
        self.state = "error";
      }
    }),
  }));
