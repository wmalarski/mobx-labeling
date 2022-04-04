import { Instance, SnapshotIn, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { FieldBase } from "../base/FieldBase";
import { ShapeDefinitionBase } from "../base/ShapeDefinitionBase";
import { currentValue, currentValueKey } from "./utils";

const kind = types.optional(types.literal("Line"), "Line");

export const LineValue = types
  .model({
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

export const LineDefinition = types.compose(
  "LineDefinition",
  ShapeDefinitionBase,
  types.model({
    id: types.optional(types.identifier, nanoid),
    kind,
  })
);

export const LineField = types
  .compose(
    "LineField",
    FieldBase,
    types.model({
      kind,
      definition: types.reference(LineDefinition),
      values: types.optional(types.map(LineValue), {}),
    })
  )
  .actions((self) => ({
    setCurrent(value: SnapshotIn<typeof LineValue>) {
      const key = currentValueKey(self);
      self.values.set(key, LineValue.create(value));
    },
  }))
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }));

export const isEqualLine = (
  first: Instance<typeof LineValue>,
  second: Instance<typeof LineValue>
): boolean => {
  return (
    first.values.length === second.values.length &&
    first.values.every((value, index) => value === second.values[index])
  );
};
