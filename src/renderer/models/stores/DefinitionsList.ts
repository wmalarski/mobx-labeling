import { types } from "mobx-state-tree";
import { DefinitionEntry } from "./DefinitionEntry";

export const DefinitionsList = types.model("DefinitionsList", {
  query: types.optional(types.string, ""),
  start: types.optional(types.number, 0),
  definitions: types.array(DefinitionEntry),
  isLoading: types.optional(types.boolean, false),
  error: types.maybeNull(types.string),
});
