import { theme } from "@nextui-org/react";
import { types } from "mobx-state-tree";
import { FieldBase, FieldDescriptionBase } from "../base";

const kind = types.optional(types.literal("Rectangle"), "Rectangle");

export const RectangleValue = types.model("RectangleValue", {
  value: types.array(types.number),
});

export const RectangleDefinition = types
  .compose(
    "RectangleDefinition",
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

export const RectangleField = types
  .compose(
    "RectangleField",
    FieldBase,
    types.model({
      kind,
      definition: RectangleDefinition,
      values: types.optional(types.map(RectangleValue), {}),
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
