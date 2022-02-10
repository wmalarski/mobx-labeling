import { theme } from "@nextui-org/react";
import { types } from "mobx-state-tree";
import { FieldBase, FieldDescriptionBase } from "../base";

const kind = types.optional(types.literal("Box3d"), "Box3d");

export const Box3dValue = types.model("Box3dValue", {
  front: types.array(types.number),
  side: types.maybeNull(types.array(types.number)),
  sideType: types.maybeNull(types.enumeration(["Left", "Right"])),
});

export const Box3dDefinition = types
  .compose(
    "Box3dDefinition",
    FieldDescriptionBase,
    types.model({
      kind,
      color: types.optional(types.string, theme.colors.primary.value),
    })
  )
  .actions((self) => ({
    setColor(color: string) {
      self.color = color;
    },
  }));

export const Box3dField = types
  .compose(
    "Box3dField",
    FieldBase,
    types.model({
      kind,
      definition: Box3dDefinition,
      values: types.optional(types.map(Box3dValue), {}),
    })
  )
  .views((self) => ({
    get current() {
      switch (self.definition.change) {
        case "EveryFrame":
        case "FrameChanges":
          return self.values.get(self.currentFrame);
        case "Singleton":
          return self.values.get("All");
      }
    },
  }));
