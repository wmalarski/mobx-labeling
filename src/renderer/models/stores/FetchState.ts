import { types } from "mobx-state-tree";

export const FetchState = types.optional(
  types.enumeration("State", ["initialized", "pending", "done", "error"]),
  "initialized"
);
