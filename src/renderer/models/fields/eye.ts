import { types } from "mobx-state-tree";
import { FieldBase, FieldDescriptionBase } from "../base";

const kind = types.literal("Eye");

export const EyeValue = types.model("EyeValue", {
  values: types.array(types.number),
});

export const EyeDefinition = types
  .compose(
    "EyeDefinition",
    FieldDescriptionBase,
    types.model({
      kind,
      color: types.string,
    })
  )
  .actions((self) => ({
    setColor(color: string) {
      self.color = color;
    },
  }));

export const EyeField = types
  .compose(
    "EyeField",
    FieldBase,
    types.model({
      kind,
      definition: EyeDefinition,
      values: types.map(EyeValue),
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
