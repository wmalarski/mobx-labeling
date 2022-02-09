import { types } from "mobx-state-tree";

export const NumberValue = types.number;

export const NumberDefinition = types.model("NumberDefinition", {
  kind: types.literal("Number"),
  min: types.number,
  max: types.number,
  step: types.number,
  default: NumberValue,
});
