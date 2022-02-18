import { types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { ProjectDefinition } from "../definition/ProjectDefinition/ProjectDefinition";
import { Item } from "./Item";
import { Resource } from "./Resource";

export const Project = types.model("Project", {
  id: types.optional(types.identifier, nanoid),
  name: types.string,
  definition: ProjectDefinition,
  items: types.array(Item),
  resources: types.array(Resource),
  createdAt: types.optional(types.Date, () => new Date()),
  updatedAt: types.optional(types.Date, () => new Date()),
});
