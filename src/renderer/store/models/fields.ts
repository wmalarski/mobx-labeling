import { types } from "mobx-state-tree";

export const CheckBoxValue = types.boolean;

export const CheckBoxDefinition = types.model("CheckBoxDefinition", {
  kind: types.literal("CheckBox"),
  default: CheckBoxValue,
});

export const ComboBoxValue = types.string;

export const ComboBoxDefinition = types.model("ComboBoxDefinition", {
  kind: types.literal("Combo"),
  default: ComboBoxValue,
  options: types.array(types.string),
});

export const EyeValue = types.array(types.number);

export const EyeDefinition = types.model("EyeDefinition", {
  kind: types.literal("Eye"),
  default: EyeValue,
  color: types.string,
});

export const GraphValue = types.model("GraphValue", {
  points: types.array(
    types.model({ x: types.number, y: types.number, n: types.number })
  ),
  edges: types.array(types.model({ from: types.number, to: types.number })),
});

export const GraphDefinition = types.model("GraphDefinition", {
  kind: types.literal("Graph"),
  default: GraphValue,
  color: types.string,
});

export const LineValue = types.array(types.number);

export const LineDefinition = types.model("LineDefinition", {
  kind: types.literal("Line"),
  default: LineValue,
  color: types.string,
});

export const MultiSelectValue = types.array(types.string);

export const MultiSelectDefinition = types.model("MultiSelectDefinition", {
  kind: types.literal("MultiSelect"),
  default: MultiSelectValue,
  options: types.array(
    types.model({
      text: types.string,
      size: types.number,
    })
  ),
});

export const NumberValue = types.number;

export const NumberDefinition = types.model("NumberDefinition", {
  kind: types.literal("Number"),
  min: types.number,
  max: types.number,
  step: types.number,
  default: NumberValue,
});

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
