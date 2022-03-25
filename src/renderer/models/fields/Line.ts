import { types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { FieldBase } from "../base/FieldBase";
import { ShapeDefinitionBase } from "../base/ShapeDefinitionBase";
import { currentValue } from "./utils";

const kind = types.optional(types.literal("Line"), "Line");

export const LineValue = types
  .model({
    values: types.array(types.number),
  })
  .actions((self) => ({
    updateValue(index: number, value: number) {
      self.values[index] = value;
    },
    addPoint(index: number, x: number, y: number) {
      self.values.splice(index, 0, x, y);
    },
    removePoint(index: number) {
      self.values.splice(index, 2);
    },
  }));

export const LineDefinition = types.compose(
  "LineDefinition",
  ShapeDefinitionBase,
  types.model({
    id: types.optional(types.identifier, nanoid),
    kind,
  })
);

export const LineField = types
  .compose(
    "LineField",
    FieldBase,
    types.model({
      kind,
      definition: types.reference(LineDefinition),
      values: types.optional(types.map(LineValue), {}),
    })
  )
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }));
