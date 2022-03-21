import { types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { FieldBase } from "../base/FieldBase";
import { FieldDefinitionBase } from "../base/FieldDefinitionBase";
import { currentValue } from "./utils";

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
    FieldDefinitionBase,
    types.model({
      id: types.optional(types.identifier, nanoid),
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
      definition: types.reference(CheckBoxDefinition),
      values: types.optional(types.map(CheckBoxValue), {}),
    })
  )
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }));
