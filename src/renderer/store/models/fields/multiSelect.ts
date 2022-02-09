import { types } from "mobx-state-tree";
import { FieldBase, FieldDescriptionBase } from "../base";

const kind = types.literal("MultiSelect");

export const MultiSelectValue = types.model("MultiSelectValue", {
  values: types.array(types.string),
});

export const MultiSelectDefinition = types.compose(
  "MultiSelectDefinition",
  FieldDescriptionBase,
  types.model({
    kind,
    default: types.array(types.string),
    options: types.array(
      types.model({
        text: types.string,
        size: types.number,
      })
    ),
  })
);

export const MultiSelectField = types
  .compose(
    "MultiSelectField",
    FieldBase,
    types.model({
      kind,
      description: MultiSelectDefinition,
      values: types.map(MultiSelectValue),
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
