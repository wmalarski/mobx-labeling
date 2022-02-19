import { flow, types } from "mobx-state-tree";
import { DefinitionEntry } from "./DefinitionEntry";
import { FetchState } from "./FetchState";

export const DefinitionsList = types
  .model("DefinitionsList", {
    query: types.maybe(types.string),
    start: types.optional(types.number, 0),
    definitions: types.array(DefinitionEntry),
    state: FetchState,
    error: types.maybeNull(types.string),
  })
  .actions((self) => {
    const load = flow(function* (start: number, query?: string) {
      self.start = start;
      self.query = query;
      self.state = "pending";
      try {
        const result = yield window.electron.ipcDefinitions.readDefinitions({
          limit: 40,
          start,
          query,
        });
        self.definitions.replace(result);
        self.state = "done";
      } catch (error) {
        self.state = "error";
      }
    });

    return {
      load,
      afterCreate() {
        load(0);
      },
    };
  });
