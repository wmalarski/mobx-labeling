import { types } from "mobx-state-tree";
import { FieldBase, FieldDescriptionBase } from "../base";

const kind = types.literal("Polygon");

export const PolygonValue = types.model("PolygonValue", {
  values: types.array(types.number),
});

export const PolygonDefinition = types
  .compose(
    "PolygonDefinition",
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

export const PolygonField = types
  .compose(
    "PolygonField",
    FieldBase,
    types.model({
      kind,
      definition: PolygonDefinition,
      values: types.map(PolygonValue),
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
