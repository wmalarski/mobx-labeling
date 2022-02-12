import { types } from "mobx-state-tree";
import { FieldBase, ShapeDefinitionBase } from "../base";

const kind = types.optional(types.literal("Point"), "Point");

export const PointValue = types.model("PointValue", {
  value: types.array(types.number),
});

export const PointDefinition = types.compose(
  "PointDefinition",
  ShapeDefinitionBase,
  types.model({
    kind,
  })
);

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
