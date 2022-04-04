import { getSnapshot, Instance, SnapshotIn, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { FieldBase } from "../base/FieldBase";
import { FieldDefinitionBase } from "../base/FieldDefinitionBase";
import { currentValue, currentValueKey } from "./utils";

const defaultValues = ["Left Lane", "Right Lane"];
const defaultOptions = [
  { text: "Left Border", size: 6 },
  { text: "Left Lane", size: 6 },
  { text: "Right Lane", size: 6 },
  { text: "Right Border", size: 6 },
];

const kind = types.optional(types.literal("MultiSelect"), "MultiSelect");

export const MultiSelectValue = types
  .model("MultiSelectValue", {
    values: types.array(types.string),
  })
  .actions((self) => ({
    setValues(values: string[]) {
      self.values.replace(values);
    },
  }));

export const MultiSelectDefinitionOption = types
  .model("MultiSelectDefinitionOption", {
    text: types.string,
    size: types.number,
  })
  .actions((self) => ({
    setSize(size: number) {
      self.size = size;
    },
  }));

export const MultiSelectDefinition = types
  .compose(
    "MultiSelectDefinition",
    FieldDefinitionBase,
    types.model({
      id: types.optional(types.identifier, nanoid),
      kind,
      default: types.optional(types.array(types.string), defaultValues),
      options: types.optional(
        types.array(MultiSelectDefinitionOption),
        defaultOptions
      ),
    })
  )
  .actions((self) => ({
    setDefault(defaultValue: string[]) {
      self.default.replace(defaultValue);
    },
    pushOption(option: SnapshotIn<typeof MultiSelectDefinitionOption>) {
      self.options.push(MultiSelectDefinitionOption.create(option));
    },
    removeOption(option: Instance<typeof MultiSelectDefinitionOption>) {
      self.options.remove(option);
    },
  }));

export const MultiSelectField = types
  .compose(
    "MultiSelectField",
    FieldBase,
    types.model({
      kind,
      definition: types.reference(MultiSelectDefinition),
      values: types.optional(types.map(MultiSelectValue), {}),
    })
  )
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }))
  .actions((self) => ({
    setCurrent(value: SnapshotIn<typeof MultiSelectValue>) {
      const key = currentValueKey(self);
      self.values.set(key, MultiSelectValue.create(value));
    },
    afterCreate() {
      if (self.values.size > 0) return;
      self.values.set(currentValueKey(self), {
        values: getSnapshot(self.definition.default),
      });
    },
  }));

export const isEqualMultiSelect = (
  first: Instance<typeof MultiSelectValue>,
  second: Instance<typeof MultiSelectValue>
): boolean => {
  return (
    first.values.length === second.values.length &&
    first.values.every((value, index) => value === second.values[index])
  );
};
