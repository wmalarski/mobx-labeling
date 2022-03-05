import { types } from "mobx-state-tree";

export const ProjectEntry = types.model("ProjectEntry", {
  id: types.identifier,
  name: types.string,
  projectPath: types.string,
  updatedAt: types.Date,
  definition: types.string,
});
