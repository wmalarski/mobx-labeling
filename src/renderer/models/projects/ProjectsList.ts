import { flow, types } from "mobx-state-tree";
import { FetchState } from "../common/FetchState";
import { ProjectEntry } from "./ProjectEntry";

const pageLimit = 10;

type ProjectsListLoadArgs = {
  page?: number;
  query?: string;
};

export const ProjectsList = types
  .model("ProjectsList", {
    query: types.optional(types.string, ""),
    page: types.optional(types.number, 0),
    totalSize: types.optional(types.number, 0),
    projects: types.array(ProjectEntry),
    state: FetchState,
    error: types.maybeNull(types.string),
  })
  .actions((self) => {
    const load = flow(function* ({
      page = self.page,
      query = self.query,
    }: ProjectsListLoadArgs = {}) {
      self.page = page;
      self.query = query;
      self.state = "pending";
      try {
        console.log({
          limit: pageLimit,
          start: self.page * pageLimit,
          query: self.query,
        });
        const { data, totalSize } =
          yield window.electron.ipcProject.readProjects({
            limit: pageLimit,
            start: self.page * pageLimit,
            query: self.query,
          });

        console.log({
          data,
          totalSize,
        });

        self.projects.replace(data);
        self.totalSize = totalSize;
        self.state = "done";
      } catch (error) {
        console.log({ error });
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
