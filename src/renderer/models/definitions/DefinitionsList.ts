import { flow, types } from "mobx-state-tree";
import { FetchState } from "../common/FetchState";
import { DefinitionEntry } from "./DefinitionEntry";

const pageLimit = 10;

type DefinitionsListLoadArgs = {
  page?: number;
  query?: string;
};

export const DefinitionsList = types
  .model("DefinitionsList", {
    query: types.optional(types.string, ""),
    page: types.optional(types.number, 0),
    totalSize: types.optional(types.number, 0),
    definitions: types.array(DefinitionEntry),
    state: FetchState,
    error: types.maybeNull(types.string),
  })
  .actions((self) => {
    const load = flow(function* ({
      page = self.page,
      query = self.query,
    }: DefinitionsListLoadArgs = {}) {
      self.page = page;
      self.query = query;
      self.state = "pending";
      try {
        const { data, totalSize } =
          yield window.electron.ipcDefinitions.readDefinitions({
            limit: pageLimit,
            start: self.page * pageLimit,
            query: self.query,
          });
        self.definitions.replace(data);
        self.totalSize = totalSize;
        self.state = "done";
      } catch (error) {
        self.state = "error";
        self.error = String(error);
      }
    });

    return {
      load,
      afterCreate() {
        load();
      },
    };
  })
  .views((self) => ({
    get totalPages() {
      return Math.ceil(self.totalSize / pageLimit);
    },
  }));
