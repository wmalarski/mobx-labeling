import { types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { FieldBase } from "../base/FieldBase";
import { ShapeDefinitionBase } from "../base/ShapeDefinitionBase";
import { currentValue } from "./utils";

const kind = types.optional(types.literal("Polygon"), "Polygon");

export const PolygonValue = types
  .model("PolygonValue", {
    values: types.array(types.number),
  })
  .actions((self) => ({
    updateValue(index: number, value: number) {
      self.values[index] = value;
    },
    addPoint(index: number, x: number, y: number) {
      self.values.splice(index, 0, x, y);
    },
    removePoint(index: number) {
      self.values.splice(index, 2);
    },
  }));

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
