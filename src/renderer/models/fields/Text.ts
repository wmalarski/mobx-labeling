import { Instance, SnapshotIn, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { FieldBase } from "../base/FieldBase";
import { FieldDefinitionBase } from "../base/FieldDefinitionBase";
import { currentValue, currentValueKey } from "./utils";

const kind = types.optional(types.literal("Text"), "Text");

export const TextValue = types
  .model("TextValue", {
    value: types.string,
  })
  .actions((self) => ({
    setValue(value: string) {
      self.value = value;
    },
  }));

export const TextDefinition = types
  .compose(
    "TextDefinition",
    FieldDefinitionBase,
    types.model({
      id: types.optional(types.identifier, nanoid),
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
      definition: types.reference(TextDefinition),
      values: types.map(TextValue),
    })
  )
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }))
  .actions((self) => ({
    setCurrent(value: SnapshotIn<typeof TextValue>) {
      const key = currentValueKey(self);
      self.values.set(key, TextValue.create(value));
    },
    afterCreate() {
      if (self.values.size > 0) return;
      self.values.set(currentValueKey(self), {
        value: self.definition.default,
      });
    },
  }));

export const isEqualText = (
  first: Instance<typeof TextValue>,
  second: Instance<typeof TextValue>
): boolean => {
  return first.value === second.value;
};
