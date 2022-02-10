import { types } from "mobx-state-tree";
import { FieldBase, FieldDescriptionBase } from "../base";

const kind = types.optional(types.literal("CheckBox"), "CheckBox");

export const CheckBoxValue = types
  .model("CheckBoxValue", {
    value: types.boolean,
  })
  .actions((self) => ({
    setValue(value: boolean) {
      self.value = value;
    },
  }));

export const CheckBoxDefinition = types
  .compose(
    "CheckBoxDefinition",
    FieldDescriptionBase,
    types.model({
      kind,
      default: types.optional(types.boolean, false),
    })
  )
  .actions((self) => ({
    setDefault(defaultValue: boolean) {
      self.default = defaultValue;
    },
  }));

export const CheckBoxField = types
  .compose(
    "CheckBoxField",
    FieldBase,
    types.model({
      kind,
      definition: CheckBoxDefinition,
      values: types.optional(types.map(CheckBoxValue), {}),
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
