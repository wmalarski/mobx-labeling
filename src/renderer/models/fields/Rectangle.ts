import { types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { FieldBase } from "../base/FieldBase";
import { ShapeDefinitionBase } from "../base/ShapeDefinitionBase";
import { currentValue } from "./utils";

const kind = types.optional(types.literal("Rectangle"), "Rectangle");

export const RectangleValue = types.model("RectangleValue", {
  value: types.array(types.number),
});

export const RectangleDefinition = types.compose(
  "RectangleDefinition",
  ShapeDefinitionBase,
  types.model({
    id: types.optional(types.identifier, nanoid),
    kind,
  })
);

export const RectangleField = types
  .compose(
    "RectangleField",
    FieldBase,
    types.model({
      kind,
      definition: types.reference(RectangleDefinition),
      values: types.optional(types.map(RectangleValue), {}),
    })
  )
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }));
