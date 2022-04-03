import { types } from "mobx-state-tree";
import { Range } from "../common/Range";

export const BatchInfo = types.model("BatchInfo", {
  id: types.identifier,
  range: Range,
});
