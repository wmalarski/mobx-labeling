import { SnapshotIn, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { FieldBase } from "../base/FieldBase";
import { FieldDefinitionBase } from "../base/FieldDefinitionBase";
import { currentValue, currentValueKey } from "./utils";

const kind = types.optional(types.literal("Number"), "Number");

export const NumberValue = types
  .model("NumberValue", {
    value: types.number,
  })
  .actions((self) => ({
    setValue(value: number) {
      self.value = value;
    },
  }));

export const NumberDefinition = types
  .compose(
    "NumberDefinition",
    FieldDefinitionBase,
    types.model({
      id: types.optional(types.identifier, nanoid),
      kind,
      min: types.optional(types.number, 0),
      max: types.optional(types.number, 100),
      step: types.optional(types.number, 1),
      default: types.optional(types.number, 5),
    })
  )
  .actions((self) => ({
    setDefault(defaultValue: number) {
      self.default = defaultValue;
    },
    setMin(min: number) {
      self.min = min;
    },
    setMax(max: number) {
      self.max = max;
    },
    setStep(step: number) {
      self.step = step;
    },
  }));

export const NumberField = types
  .compose(
    "NumberField",
    FieldBase,
    types.model({
      kind,
      definition: types.reference(NumberDefinition),
      values: types.optional(types.map(NumberValue), {}),
    })
  )
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }))
  .actions((self) => ({
    setCurrent(value: SnapshotIn<typeof NumberValue>) {
      const key = currentValueKey(self);
      self.values.set(key, NumberValue.create(value));
    },
    afterCreate() {
      if (self.values.size > 0) return;
      self.values.set(currentValueKey(self), {
        value: self.definition.default,
      });
    },
  }));
