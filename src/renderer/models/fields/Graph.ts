import { types } from "mobx-state-tree";
import { FieldBase } from "../base/FieldBase";
import { ShapeDefinitionBase } from "../base/ShapeDefinitionBase";
import { currentValue } from "./utils";

const kind = types.optional(types.literal("Graph"), "Graph");

export const GraphValue = types.model("GraphValue", {
  points: types.array(
    types.model({ x: types.number, y: types.number, n: types.number })
  ),
  edges: types.array(types.model({ from: types.number, to: types.number })),
});

export const GraphDefinition = types.compose(
  "GraphDefinition",
  ShapeDefinitionBase,
  types.model({
    kind,
  })
);

export const GraphField = types
  .compose(
    "GraphField",
    FieldBase,
    types.model({
      definition: GraphDefinition,
      values: types.optional(types.map(GraphValue), {}),
    })
  )
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }));
