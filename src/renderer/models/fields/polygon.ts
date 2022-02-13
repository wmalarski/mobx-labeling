import { types } from "mobx-state-tree";
import { FieldBase, ShapeDefinitionBase } from "../base";
import { currentValue } from "../utils";

const kind = types.optional(types.literal("Polygon"), "Polygon");

export const PolygonValue = types.model("PolygonValue", {
  values: types.array(types.number),
});

export const PolygonDefinition = types.compose(
  "PolygonDefinition",
  ShapeDefinitionBase,
  types.model({
    kind,
  })
);

export const PolygonField = types
  .compose(
    "PolygonField",
    FieldBase,
    types.model({
      kind,
      definition: PolygonDefinition,
      values: types.optional(types.map(PolygonValue), {}),
    })
  )
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }));
