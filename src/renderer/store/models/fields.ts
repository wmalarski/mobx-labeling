import { types } from "mobx-state-tree";
import { Box3dDescription } from "./fields/box3d";

export const CheckBoxValue = types.boolean;

export const CheckBoxDescription = types.model("CheckBoxDescription", {
  kind: types.literal("CheckBox"),
  default: CheckBoxValue,
});

export const ComboBoxValue = types.string;

export const ComboBoxDescription = types.model("ComboBoxDescription", {
  kind: types.literal("Combo"),
  default: ComboBoxValue,
  options: types.array(types.string),
});

export const EyeValue = types.array(types.number);

export const EyeDescription = types.model("EyeDescription", {
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

export const GraphDescription = types.model("GraphDescription", {
  kind: types.literal("Graph"),
  default: GraphValue,
  color: types.string,
});

export const LineValue = types.array(types.number);

export const LineDescription = types.model("LineDescription", {
  kind: types.literal("Line"),
  default: LineValue,
  color: types.string,
});

export const MultiSelectValue = types.array(types.string);

export const MultiSelectDescription = types.model("MultiSelectDescription", {
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

export const NumberDescription = types.model("NumberDescription", {
  kind: types.literal("Number"),
  min: types.number,
  max: types.number,
  step: types.number,
  default: NumberValue,
});

export const PointValue = types.array(types.number);

export const PointDescription = types.model("PointDescription", {
  kind: types.literal("Point"),
  default: PointValue,
  color: types.string,
});

export const PolygonValue = types.array(types.number);

export const PolygonDescription = types.model("PolygonDescription", {
  kind: types.literal("Polygon"),
  default: PolygonValue,
  color: types.string,
});

export const RectangleValue = types.array(types.number);

export const RectangleDescription = types.model("RectangleDescription", {
  kind: types.literal("Rectangle"),
  default: RectangleValue,
  color: types.string,
});

export const SelectValue = types.string;

export const SelectDescription = types.model("SelectDescription", {
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

export const TextDescription = types.model("TextDescription", {
  kind: types.literal("Text"),
  default: TextValue,
});

const FieldDescription1 = types.union(
  Box3dDescription,
  CheckBoxDescription,
  ComboBoxDescription,
  EyeDescription,
  GraphDescription,
  LineDescription,
  MultiSelectDescription,
  NumberDescription,
  PointDescription
);

const FieldDescription2 = types.union(
  PolygonDescription,
  RectangleDescription,
  SelectDescription,
  TextDescription
);

export const FieldDescription = types.union(
  FieldDescription1,
  FieldDescription2
);
