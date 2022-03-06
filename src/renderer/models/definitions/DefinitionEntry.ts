import { types } from "mobx-state-tree";

export const DefinitionEntry = types.model("DefinitionEntry", {
  id: types.identifier,
  name: types.string,
  description: types.string,
  updatedAt: types.Date,
});
