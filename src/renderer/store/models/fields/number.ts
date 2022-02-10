import { types } from "mobx-state-tree";
import { FieldBase, FieldDescriptionBase } from "../base";

const kind = types.literal("Number");

export const NumberValue = types.model("NumberValue", {
  value: types.number,
});

export const NumberDefinition = types
  .compose(
    "NumberDefinition",
    FieldDescriptionBase,
    types.model({
      kind,
      min: types.number,
      max: types.number,
      step: types.number,
      default: types.number,
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
      definition: NumberDefinition,
      values: types.map(NumberValue),
    })
  )
  .views((self) => ({
    get current() {
      switch (self.definition.change) {
        case "EveryFrame":
        case "FrameChanges":
          return self.values.get(self.currentFrame);
        case "Singleton":
          return self.values.get("All");
      }
    },
  }));
