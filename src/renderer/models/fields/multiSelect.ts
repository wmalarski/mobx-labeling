import { Instance, SnapshotIn, types } from "mobx-state-tree";
import { FieldBase, FieldDefinitionBase } from "../base";
import { currentValue } from "../utils";

const defaultValues = ["Left Lane", "Right Lane"];
const defaultOptions = [
  { text: "Left Border", size: 3 },
  { text: "Left Lane", size: 3 },
  { text: "Right Lane", size: 3 },
  { text: "Right Border", size: 3 },
];

const kind = types.optional(types.literal("MultiSelect"), "MultiSelect");

export const MultiSelectValue = types.model("MultiSelectValue", {
  values: types.array(types.string),
});

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
      definition: MultiSelectDefinition,
      values: types.optional(types.map(MultiSelectValue), {}),
    })
  )
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }));
