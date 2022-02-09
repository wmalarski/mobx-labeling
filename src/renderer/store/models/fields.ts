import { types } from "mobx-state-tree";

export const PointValue = types.array(types.number);

export const PointDefinition = types.model("PointDefinition", {
  kind: types.literal("Point"),
  default: PointValue,
  color: types.string,
});

export const PolygonValue = types.array(types.number);

export const PolygonDefinition = types.model("PolygonDefinition", {
  kind: types.literal("Polygon"),
  default: PolygonValue,
  color: types.string,
});

export const RectangleValue = types.array(types.number);

export const RectangleDefinition = types.model("RectangleDefinition", {
  kind: types.literal("Rectangle"),
  default: RectangleValue,
  color: types.string,
});

export const SelectValue = types.string;

export const SelectDefinition = types.model("SelectDefinition", {
  kind: types.literal("Select"),
  default: SelectValue,
  options: types.array(
    types.model({
      text: types.string,
      size: types.number,
    })
  ),
});

export const TextValue = types.string;

export const TextDefinition = types.model("TextDefinition", {
  kind: types.literal("Text"),
  default: TextValue,
});
