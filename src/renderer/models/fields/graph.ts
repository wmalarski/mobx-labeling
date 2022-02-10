import { theme } from "@nextui-org/react";
import { types } from "mobx-state-tree";
import { FieldBase, FieldDescriptionBase } from "../base";

const kind = types.optional(types.literal("Graph"), "Graph");

export const GraphValue = types.model("GraphValue", {
  points: types.array(
    types.model({ x: types.number, y: types.number, n: types.number })
  ),
  edges: types.array(types.model({ from: types.number, to: types.number })),
});

export const GraphDefinition = types
  .compose(
    "GraphDefinition",
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

export const GraphField = types
  .compose(
    "GraphField",
    FieldBase,
    types.model({
      kind,
      definition: GraphDefinition,
      values: types.optional(types.map(GraphValue), {}),
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
