import { types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { FieldBase } from "../base/FieldBase";
import { FieldDefinitionBase } from "../base/FieldDefinitionBase";
import { currentValue, currentValueKey } from "./utils";

const defaultValue = "Car";
const defaultOptions = ["Car", "Pedestrian", "Motor", "Bicycle"];

const kind = types.optional(types.literal("ComboBox"), "ComboBox");

export const ComboBoxValue = types
  .model("ComboBoxValue", {
    value: types.string,
  })
  .actions((self) => ({
    setValue(value: string) {
      self.value = value;
    },
  }));

export const ComboBoxDefinition = types
  .compose(
    "ComboBoxDefinition",
    FieldDefinitionBase,
    types.model({
      id: types.optional(types.identifier, nanoid),
      kind,
      default: types.optional(types.string, defaultValue),
      options: types.optional(types.array(types.string), defaultOptions),
    })
  )
  .actions((self) => ({
    setDefault(defaultValue: string) {
      self.default = defaultValue;
    },
    pushOption(option: string) {
      self.options.push(option);
    },
    removeOption(option: string) {
      self.options.remove(option);
    },
  }));

export const ComboBoxField = types
  .compose(
    "ComboBoxField",
    FieldBase,
    types.model({
      kind,
      definition: types.reference(ComboBoxDefinition),
      values: types.optional(types.map(ComboBoxValue), {}),
    })
  )
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }))
  .actions((self) => ({
    afterCreate() {
      if (self.values.size > 0) return;
      self.values.set(currentValueKey(self), {
        value: self.definition.default,
      });
    },
  }));
