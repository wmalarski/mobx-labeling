import { types } from "mobx-state-tree";
import { ProjectDefinition } from "../definition/ProjectDefinition/ProjectDefinition";
import { BatchInfo } from "./BatchInfo";
import { Resource } from "./Resource";

export const Project = types.model("Project", {
  id: types.identifier,
  name: types.string,
  projectPath: types.string,
  updatedAt: types.Date,
  batchSize: types.number,
  resources: types.array(Resource),
  definition: ProjectDefinition,
  batches: types.array(BatchInfo),
});
