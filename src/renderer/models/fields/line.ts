import { types } from "mobx-state-tree";
import { FieldBase, ShapeDefinitionBase } from "../base";
import { currentValue } from "../utils";

const kind = types.optional(types.literal("Line"), "Line");

export const LineValue = types.model({
  values: types.array(types.number),
});

export const LineDefinition = types.compose(
  "LineDefinition",
  ShapeDefinitionBase,
  types.model({
    kind,
  })
);

export const LineField = types
  .compose(
    "LineField",
    FieldBase,
    types.model({
      kind,
      definition: LineDefinition,
      values: types.optional(types.map(LineValue), {}),
    })
  )
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }));
