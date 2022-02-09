import { types } from "mobx-state-tree";
import { FieldBase, FieldDescriptionBase } from "../base";

export const Box3dValue = types.model("Box3dValue", {
  front: types.array(types.number),
  side: types.maybeNull(types.array(types.number)),
  sideType: types.maybeNull(types.enumeration(["Left", "Right"])),
});

export const Box3dDescription = types
  .compose(
    "Box3dDescription",
    FieldDescriptionBase,
    types.model({
      kind: types.literal("Box3d"),
      color: types.string,
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
      kind: types.literal("Box3d"),
      description: Box3dDescription,
      values: types.map(Box3dValue),
    })
  )
  .views((self) => ({
    get current() {
      switch (self.description.change) {
        case "EveryFrame":
        case "FrameChanges":
          return self.values.get(self.currentFrame);
        case "Singleton":
          return self.values.get("All");
      }
    },
  }));
