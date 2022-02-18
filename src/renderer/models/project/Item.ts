import { types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { ItemDefinition } from "../definition/ItemDefinition/ItemDefinition";
import { Field } from "./Field";

export const Item = types.model("Item", {
  id: types.optional(types.identifier, nanoid),
  name: types.string,
  fields: types.array(Field),
  definition: ItemDefinition,
});
