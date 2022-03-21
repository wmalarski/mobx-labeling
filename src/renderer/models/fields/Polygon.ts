import { types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { FieldBase } from "../base/FieldBase";
import { ShapeDefinitionBase } from "../base/ShapeDefinitionBase";
import { currentValue } from "./utils";

const kind = types.optional(types.literal("Polygon"), "Polygon");

export const PolygonValue = types.model("PolygonValue", {
  values: types.array(types.number),
});

export const PolygonDefinition = types.compose(
  "PolygonDefinition",
  ShapeDefinitionBase,
  types.model({
    id: types.optional(types.identifier, nanoid),
    kind,
  })
);

export const PolygonField = types
  .compose(
    "PolygonField",
    FieldBase,
    types.model({
      kind,
      definition: types.reference(PolygonDefinition),
      values: types.optional(types.map(PolygonValue), {}),
    })
  )
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }));
