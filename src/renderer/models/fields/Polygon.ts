import { Instance, SnapshotIn, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { FieldBase } from "../base/FieldBase";
import { ShapeDefinitionBase } from "../base/ShapeDefinitionBase";
import { currentValue, currentValueKey } from "./utils";

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
  .actions((self) => ({
    setCurrent(value: SnapshotIn<typeof PolygonValue>) {
      const key = currentValueKey(self);
      self.values.set(key, PolygonValue.create(value));
    },
  }))
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }));

export const isEqualPolygon = (
  first: Instance<typeof PolygonValue>,
  second: Instance<typeof PolygonValue>
): boolean => {
  return (
    first.values.length === second.values.length &&
    first.values.every((value, index) => value === second.values[index])
  );
};
