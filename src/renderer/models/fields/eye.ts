import { types } from "mobx-state-tree";
import { FieldBase, ShapeDefinitionBase } from "../base";

const kind = types.optional(types.literal("Eye"), "Eye");

export const EyeValue = types.model("EyeValue", {
  values: types.array(types.number),
});

export const EyeDefinition = types.compose(
  "EyeDefinition",
  ShapeDefinitionBase,
  types.model({
    kind,
  })
);

export const EyeField = types
  .compose(
    "EyeField",
    FieldBase,
    types.model({
      kind,
      definition: EyeDefinition,
      values: types.optional(types.map(EyeValue), {}),
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
