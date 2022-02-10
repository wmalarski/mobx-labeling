import { types } from "mobx-state-tree";
import { FieldBase, FieldDescriptionBase } from "../base";

const defaultValue = "Sunny";
const defaultOptions = [
  { text: "Sunny", size: 3 },
  { text: "Rain", size: 3 },
  { text: "Clouds", size: 3 },
  { text: "Snow", size: 3 },
];

const kind = types.optional(types.literal("Select"), "Select");

export const SelectValue = types.model("SelectValue", {
  value: types.string,
});

export const SelectDefinition = types
  .compose(
    "SelectDefinition",
    FieldDescriptionBase,
    types.model({
      kind,
      default: types.optional(types.string, defaultValue),
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
  )
  .actions((self) => ({
    setDefault(defaultValue: string) {
      self.default = defaultValue;
    },
  }));

export const SelectField = types
  .compose(
    "SelectField",
    FieldBase,
    types.model({
      kind,
      definition: SelectDefinition,
      values: types.optional(types.map(SelectValue), {}),
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
