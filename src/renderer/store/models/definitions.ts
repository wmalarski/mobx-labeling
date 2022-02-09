import { types } from "mobx-state-tree";
import { FieldDescription } from "./fields";

export const ObjectDefinition = types.model({
  id: types.string,
  name: types.string,
  info: types.maybeNull(types.string),
  fields: types.array(FieldDescription),
});
