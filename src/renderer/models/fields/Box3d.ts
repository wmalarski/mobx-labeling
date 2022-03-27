import { Instance, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { FieldBase } from "../base/FieldBase";
import { ShapeDefinitionBase } from "../base/ShapeDefinitionBase";
import { currentValue } from "./utils";

const kind = types.optional(types.literal("Box3d"), "Box3d");

export const Box3dSideType = types.enumeration(["Left", "Right", "None"]);

export const Box3dValue = types
  .model("Box3dValue", {
    front: types.array(types.number),
    side: types.array(types.number),
    sideType: types.optional(Box3dSideType, "None"),
  })
  .actions((self) => ({
    updateFront(index: number, value: number) {
      self.front[index] = value;
    },
    updateSide(index: number, value: number) {
      self.side[index] = value;
    },
    updateSideType(sideType: Instance<typeof Box3dSideType>) {
      self.sideType = sideType;
      if (sideType === "Left") {
        self.side.replace(self.front.slice(0, 4));
      } else if (sideType === "Right") {
        self.side.replace(self.front.slice(4, 8));
      }
    },
  }));

export const Box3dDefinition = types.compose(
  "Box3dDefinition",
  ShapeDefinitionBase,
  types.model({
    id: types.optional(types.identifier, nanoid),
    kind,
  })
);

export const Box3dField = types
  .compose(
    "Box3dField",
    FieldBase,
    types.model({
      kind,
      definition: types.reference(Box3dDefinition),
      values: types.optional(types.map(Box3dValue), {}),
    })
  )
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }));
