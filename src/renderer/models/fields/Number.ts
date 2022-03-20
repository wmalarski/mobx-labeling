import { types } from "mobx-state-tree";
import { FieldBase } from "../base/FieldBase";
import { FieldDefinitionBase } from "../base/FieldDefinitionBase";
import { currentValue } from "./utils";

const kind = types.optional(types.literal("Number"), "Number");

export const NumberValue = types.model("NumberValue", {
  value: types.number,
});

export const NumberDefinition = types
  .compose(
    "NumberDefinition",
    FieldDefinitionBase,
    types.model({
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
      definition: types.reference(NumberDefinition),
      values: types.optional(types.map(NumberValue), {}),
    })
  )
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }));
