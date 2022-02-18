import { types } from "mobx-state-tree";
import { FieldBase } from "../base/FieldBase";
import { ShapeDefinitionBase } from "../base/ShapeDefinitionBase";
import { currentValue } from "./utils";

const kind = types.optional(types.literal("Point"), "Point");

export const PointValue = types.model("PointValue", {
  value: types.array(types.number),
});

export const PointDefinition = types.compose(
  "PointDefinition",
  ShapeDefinitionBase,
  types.model({
    kind,
  })
);

export const PointField = types
  .compose(
    "PointField",
    FieldBase,
    types.model({
      kind,
      definition: PointDefinition,
      values: types.optional(types.map(PointValue), {}),
    })
  )
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }));
