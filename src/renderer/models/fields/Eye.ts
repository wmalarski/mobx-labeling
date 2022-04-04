import { Instance, SnapshotIn, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { FieldBase } from "../base/FieldBase";
import { ShapeDefinitionBase } from "../base/ShapeDefinitionBase";
import { currentValue, currentValueKey } from "./utils";

const kind = types.optional(types.literal("Eye"), "Eye");

export const EyeValue = types
  .model("EyeValue", {
    values: types.array(types.number),
  })
  .actions((self) => ({
    updateValue(index: number, value: number) {
      self.values[index] = value;
    },
  }));

export const EyeDefinition = types.compose(
  "EyeDefinition",
  ShapeDefinitionBase,
  types.model({
    id: types.optional(types.identifier, nanoid),
    kind,
  })
);

export const EyeField = types
  .compose(
    "EyeField",
    FieldBase,
    types.model({
      kind,
      definition: types.reference(EyeDefinition),
      values: types.optional(types.map(EyeValue), {}),
    })
  )
  .actions((self) => ({
    setCurrent(value: SnapshotIn<typeof EyeValue>) {
      const key = currentValueKey(self);
      self.values.set(key, EyeValue.create(value));
    },
  }))
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }));

export const isEqualEye = (
  first: Instance<typeof EyeValue>,
  second: Instance<typeof EyeValue>
): boolean => {
  return (
    first.values.length === second.values.length &&
    first.values.every((value, index) => value === second.values[index])
  );
};
