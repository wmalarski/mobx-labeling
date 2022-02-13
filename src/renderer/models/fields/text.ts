import { types } from "mobx-state-tree";
import { FieldBase, FieldDefinitionBase } from "../base";
import { currentValue } from "../utils";

const kind = types.optional(types.literal("Text"), "Text");

export const TextValue = types.model("TextValue", {
  value: types.string,
});

export const TextDefinition = types
  .compose(
    "TextDefinition",
    FieldDefinitionBase,
    types.model({
      kind,
      default: types.optional(types.string, ""),
    })
  )
  .actions((self) => ({
    setDefault(defaultValue: string) {
      self.default = defaultValue;
    },
  }));

export const TextField = types
  .compose(
    "TextField",
    FieldBase,
    types.model({
      kind,
      definition: TextDefinition,
      values: types.optional(types.map(TextValue), {}),
    })
  )
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }));
