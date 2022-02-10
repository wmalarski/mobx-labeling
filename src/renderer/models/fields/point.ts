import { theme } from "@nextui-org/react";
import { types } from "mobx-state-tree";
import { FieldBase, FieldDescriptionBase } from "../base";

const kind = types.optional(types.literal("Point"), "Point");

export const PointValue = types.model("PointValue", {
  value: types.array(types.number),
});

export const PointDefinition = types
  .compose(
    "PointDefinition",
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

export const PointField = types
  .compose(
    "PointField",
    FieldBase,
    types.model({
      kind,
      definition: PointDefinition,
      values: types.optional(types.map(PointValue), {}),
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
