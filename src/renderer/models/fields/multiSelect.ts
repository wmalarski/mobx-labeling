import { types } from "mobx-state-tree";
import { FieldBase, FieldDescriptionBase } from "../base";

const defaultValues = ["Left Lane", "Right Lane"];
const defaultOptions = [
  { text: "Left Border", size: 3 },
  { text: "Left Lane", size: 3 },
  { text: "Right Lane", size: 3 },
  { text: "Right Border", size: 3 },
];

const kind = types.optional(types.literal("MultiSelect"), "MultiSelect");

export const MultiSelectValue = types.model("MultiSelectValue", {
  values: types.array(types.string),
});

export const MultiSelectDefinition = types.compose(
  "MultiSelectDefinition",
  FieldDescriptionBase,
  types.model({
    kind,
    default: types.optional(types.array(types.string), defaultValues),
    options: types.optional(
      types.array(
        types.model({
          text: types.string,
          size: types.number,
        })
      ),
      defaultOptions
    ),
  })
);

export const MultiSelectField = types
  .compose(
    "MultiSelectField",
    FieldBase,
    types.model({
      kind,
      definition: MultiSelectDefinition,
      values: types.optional(types.map(MultiSelectValue), {}),
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
