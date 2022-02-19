import { flow, getSnapshot, types } from "mobx-state-tree";
import { ProjectDefinition } from "../definition/ProjectDefinition/ProjectDefinition";

export const DefinitionStore = types
  .model("DefinitionStore", {
    projectDefinition: ProjectDefinition,
    state: types.enumeration("State", ["pending", "done", "error"]),
  })
  .actions((self) => ({
    save: flow(function* () {
      self.state = "pending";
      try {
        const snapshot = getSnapshot(self.projectDefinition);
        yield window.electron.ipcDefinitions.saveDefinition(snapshot);
        self.state = "done";
      } catch (error) {
        console.error("Failed to fetch projects", error);
        self.state = "error";
      }
    }),
  }));
