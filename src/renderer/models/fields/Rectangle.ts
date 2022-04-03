import { SnapshotIn, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { FieldBase } from "../base/FieldBase";
import { ShapeDefinitionBase } from "../base/ShapeDefinitionBase";
import { currentValue, currentValueKey } from "./utils";

const kind = types.optional(types.literal("Rectangle"), "Rectangle");

export const RectangleValue = types
  .model("RectangleValue", {
    value: types.array(types.number),
  })
  .actions((self) => ({
    updateValue(index: number, value: number) {
      self.value[index] = value;
    },
  }));

export const RectangleDefinition = types.compose(
  "RectangleDefinition",
  ShapeDefinitionBase,
  types.model({
    id: types.optional(types.identifier, nanoid),
    kind,
  })
);

export const RectangleField = types
  .compose(
    "RectangleField",
    FieldBase,
    types.model({
      kind,
      definition: types.reference(RectangleDefinition),
      values: types.optional(types.map(RectangleValue), {}),
    })
  )
  .actions((self) => ({
    setCurrent(value: SnapshotIn<typeof RectangleValue>) {
      const key = currentValueKey(self);
      self.values.set(key, RectangleValue.create(value));
    },
  }))
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }));
