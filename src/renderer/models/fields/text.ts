import { types } from "mobx-state-tree";
import { FieldBase, FieldDescriptionBase } from "../base";

const kind = types.literal("Text");

export const TextValue = types.model("TextValue", {
  value: types.string,
});

export const TextDefinition = types
  .compose(
    "TextDefinition",
    FieldDescriptionBase,
    types.model({
      kind,
      default: types.string,
    })
  )
  .actions((self) => ({
    setDefault(defaultValue: string) {
      self.default = defaultValue;
    },
  }));

export const TextField = types
  .compose(
    "TextField",
    FieldBase,
    types.model({
      kind,
      definition: TextDefinition,
      values: types.map(TextValue),
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
