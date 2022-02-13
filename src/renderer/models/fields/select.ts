import { Instance, SnapshotIn, types } from "mobx-state-tree";
import { FieldBase, FieldDefinitionBase } from "../base";
import { currentValue } from "../utils";

const defaultValue = "Sunny";
const defaultOptions = [
  { text: "Sunny", size: 3 },
  { text: "Rain", size: 3 },
  { text: "Clouds", size: 3 },
  { text: "Snow", size: 3 },
];

const kind = types.optional(types.literal("Select"), "Select");

export const SelectValue = types.model("SelectValue", {
  value: types.string,
});

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
      definition: SelectDefinition,
      values: types.optional(types.map(SelectValue), {}),
    })
  )
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }));
