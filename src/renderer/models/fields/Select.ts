import { Instance, SnapshotIn, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { FieldBase } from "../base/FieldBase";
import { FieldDefinitionBase } from "../base/FieldDefinitionBase";
import { currentValue, currentValueKey } from "./utils";

const defaultValue = "Sunny";
const defaultOptions = [
  { text: "Sunny", size: 12 },
  { text: "Rain", size: 12 },
  { text: "Clouds", size: 12 },
  { text: "Snow", size: 12 },
];

const kind = types.optional(types.literal("Select"), "Select");

export const SelectValue = types
  .model("SelectValue", {
    value: types.string,
  })
  .actions((self) => ({
    setValue(value: string) {
      self.value = value;
    },
  }));

export const SelectDefinitionOption = types
  .model("SelectDefinitionOption", {
    text: types.string,
    size: types.number,
  })
  .actions((self) => ({
    setSize(size: number) {
      self.size = size;
    },
  }));

export const SelectDefinition = types
  .compose(
    "SelectDefinition",
    FieldDefinitionBase,
    types.model({
      id: types.optional(types.identifier, nanoid),
      kind,
      default: types.optional(types.string, defaultValue),
      options: types.optional(
        types.array(SelectDefinitionOption),
        defaultOptions
      ),
    })
  )
  .actions((self) => ({
    setDefault(defaultValue: string) {
      self.default = defaultValue;
    },
    pushOption(option: SnapshotIn<typeof SelectDefinitionOption>) {
      self.options.push(SelectDefinitionOption.create(option));
    },
    removeOption(option: Instance<typeof SelectDefinitionOption>) {
      self.options.remove(option);
    },
  }));

export const SelectField = types
  .compose(
    "SelectField",
    FieldBase,
    types.model({
      kind,
      definition: types.reference(SelectDefinition),
      values: types.optional(types.map(SelectValue), {}),
    })
  )
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }))
  .actions((self) => ({
    setCurrent(value: SnapshotIn<typeof SelectValue>) {
      const key = currentValueKey(self);
      self.values.set(key, SelectValue.create(value));
    },
    afterCreate() {
      if (self.values.size > 0) return;
      self.values.set(currentValueKey(self), {
        value: self.definition.default,
      });
    },
  }));
