import { Instance, SnapshotIn, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { FieldBase } from "../base/FieldBase";
import { ShapeDefinitionBase } from "../base/ShapeDefinitionBase";
import { currentValue, currentValueKey } from "./utils";

const kind = types.optional(types.literal("Graph"), "Graph");

export const GraphValue = types
  .model("GraphValue", {
    points: types.array(types.model({ x: types.number, y: types.number })),
    edges: types.array(types.model({ from: types.number, to: types.number })),
  })
  .actions((self) => ({
    updateX(index: number, value: number) {
      self.points[index].x = value;
    },
    updateY(index: number, value: number) {
      self.points[index].y = value;
    },
    addPoint(index: number, x: number, y: number) {
      self.points.splice(index, 0, { x, y });
    },
    removePoint(index: number) {
      self.points.splice(index, 1);
    },
    updateFrom(index: number, value: number) {
      self.edges[index].from = value;
    },
    updateTo(index: number, value: number) {
      self.edges[index].to = value;
    },
    addEdge(index: number, from: number, to: number) {
      self.edges.splice(index, 0, { from, to });
    },
    removeEdge(index: number) {
      self.edges.splice(index, 1);
    },
  }));

export const GraphDefinition = types.compose(
  "GraphDefinition",
  ShapeDefinitionBase,
  types.model({
    id: types.optional(types.identifier, nanoid),
    kind,
  })
);

export const GraphField = types
  .compose(
    "GraphField",
    FieldBase,
    types.model({
      kind,
      definition: types.reference(GraphDefinition),
      values: types.optional(types.map(GraphValue), {}),
    })
  )
  .actions((self) => ({
    setCurrent(value: SnapshotIn<typeof GraphValue>) {
      const key = currentValueKey(self);
      self.values.set(key, GraphValue.create(value));
    },
  }))
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }));

export const isEqualGraph = (
  first: Instance<typeof GraphValue>,
  second: Instance<typeof GraphValue>
): boolean => {
  return (
    first.edges.length === second.edges.length &&
    first.points.length === second.points.length &&
    first.edges.every((value, index) => value === second.edges[index]) &&
    first.points.every((value, index) => value === second.points[index])
  );
};
