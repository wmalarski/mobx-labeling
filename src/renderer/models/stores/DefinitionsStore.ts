import { flow, types } from "mobx-state-tree";
import { FetchState } from "../common/FetchState";
import { DefinitionsList } from "../definitions/DefinitionsList";

export const DefinitionsStore = types
  .model("DefinitionsStore", {
    definitions: DefinitionsList,
    state: FetchState,
    error: types.maybeNull(types.string),
  })
  .actions((self) => ({
    remove: flow(function* (definitionId: string) {
      self.state = "pending";
      try {
        yield window.electron.ipcDefinitions.removeDefinition(definitionId);
        self.state = "done";
        self.definitions.load();
      } catch (error) {
        self.state = "error";
        self.error = String(error);
      }
    }),
  }));
