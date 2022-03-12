import { types } from "mobx-state-tree";

export const Range = types.model("Range", {
  start: types.number,
  end: types.number,
});
