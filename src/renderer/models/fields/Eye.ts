import { types } from "mobx-state-tree";
import { FieldBase } from "../base/FieldBase";
import { ShapeDefinitionBase } from "../base/ShapeDefinitionBase";
import { currentValue } from "./utils";

const kind = types.optional(types.literal("Eye"), "Eye");

export const EyeValue = types.model("EyeValue", {
  values: types.array(types.number),
});

export const EyeDefinition = types.compose(
  "EyeDefinition",
  ShapeDefinitionBase,
  types.model({
    kind,
  })
);

export const EyeField = types
  .compose(
    "EyeField",
    FieldBase,
    types.model({
      definition: types.reference(EyeDefinition),
      values: types.optional(types.map(EyeValue), {}),
    })
  )
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }));
