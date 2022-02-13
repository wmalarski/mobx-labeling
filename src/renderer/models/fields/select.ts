import { types } from "mobx-state-tree";
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

export const SelectDefinition = types
  .compose(
    "SelectDefinition",
    FieldDefinitionBase,
    types.model({
      kind,
      default: types.optional(types.string, defaultValue),
      options: types.optional(
        types.array(
          types.model({
            text: types.string,
            size: types.number,
          })
        ),
        defaultOptions
      ),
    })
  )
  .actions((self) => ({
    setDefault(defaultValue: string) {
      self.default = defaultValue;
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
