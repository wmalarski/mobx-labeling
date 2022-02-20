import { types } from "mobx-state-tree";
import { nanoid } from "nanoid";

export const Resource = types.model("Resource", {
  id: types.optional(types.identifier, nanoid),
  path: types.string,
  fps: types.number,
});
