import { flow, getSnapshot, types } from "mobx-state-tree";
import { ProjectDefinition } from "../definition/ProjectDefinition/ProjectDefinition";
import { FetchState } from "./FetchState";

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
