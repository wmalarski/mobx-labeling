import { types } from "mobx-state-tree";
import { Range } from "./Range";

export const BatchInfo = types.model("BatchInfo", {
  id: types.identifier,
  range: Range,
});
