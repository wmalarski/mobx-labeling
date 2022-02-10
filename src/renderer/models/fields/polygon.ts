import { theme } from "@nextui-org/react";
import { types } from "mobx-state-tree";
import { FieldBase, FieldDescriptionBase } from "../base";

const kind = types.optional(types.literal("Polygon"), "Polygon");

export const PolygonValue = types.model("PolygonValue", {
  values: types.array(types.number),
});

export const PolygonDefinition = types
  .compose(
    "PolygonDefinition",
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

export const PolygonField = types
  .compose(
    "PolygonField",
    FieldBase,
    types.model({
      kind,
      definition: PolygonDefinition,
      values: types.optional(types.map(PolygonValue), {}),
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
