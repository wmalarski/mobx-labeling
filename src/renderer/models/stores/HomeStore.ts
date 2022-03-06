import { types } from "mobx-state-tree";
import { ProjectsList } from "../projects/ProjectsList";

export const HomeStore = types.model("HomeStore", {
  projects: ProjectsList,
});
