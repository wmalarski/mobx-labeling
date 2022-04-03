import { SnapshotIn, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { FieldBase } from "../base/FieldBase";
import { ShapeDefinitionBase } from "../base/ShapeDefinitionBase";
import { currentValue, currentValueKey } from "./utils";

const kind = types.optional(types.literal("Point"), "Point");

export const PointValue = types
  .model("PointValue", {
    value: types.array(types.number),
  })
  .actions((self) => ({
    updateValue(index: number, value: number) {
      self.value[index] = value;
    },
  }));

export const PointDefinition = types.compose(
  "PointDefinition",
  ShapeDefinitionBase,
  types.model({
    id: types.optional(types.identifier, nanoid),
    kind,
  })
);

export const PointField = types
  .compose(
    "PointField",
    FieldBase,
    types.model({
      kind,
      definition: types.reference(PointDefinition),
      values: types.optional(types.map(PointValue), {}),
    })
  )
  .actions((self) => ({
    setCurrent(value: SnapshotIn<typeof PointValue>) {
      const key = currentValueKey(self);
      self.values.set(key, PointValue.create(value));
    },
  }))
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }));
