import { Instance, types } from "mobx-state-tree";
import { Box3dDefinition } from "../fields/Box3d";
import { CheckBoxDefinition } from "../fields/CheckBox";
import { ComboBoxDefinition } from "../fields/ComboBox";
import { EyeDefinition } from "../fields/Eye";
import { GraphDefinition } from "../fields/Graph";
import { LineDefinition } from "../fields/Line";
import { MultiSelectDefinition } from "../fields/MultiSelect";
import { NumberDefinition } from "../fields/Number";
import { PointDefinition } from "../fields/Point";
import { PolygonDefinition } from "../fields/Polygon";
import { RectangleDefinition } from "../fields/Rectangle";
import { SelectDefinition } from "../fields/Select";
import { TextDefinition } from "../fields/Text";

export const FormDefinition = types.union(
  CheckBoxDefinition,
  ComboBoxDefinition,
  MultiSelectDefinition,
  NumberDefinition,
  SelectDefinition,
  TextDefinition
);

export const ShapeDefinition = types.union(
  Box3dDefinition,
  EyeDefinition,
  GraphDefinition,
  LineDefinition,
  PointDefinition,
  PolygonDefinition,
  RectangleDefinition
);

export const FieldDefinition = types.union(FormDefinition, ShapeDefinition);

export type DefinitionKind = Instance<typeof FieldDefinition>["kind"];

const kinds: Record<DefinitionKind, undefined> = {
  Box3d: undefined,
  CheckBox: undefined,
  ComboBox: undefined,
  Eye: undefined,
  Graph: undefined,
  Line: undefined,
  MultiSelect: undefined,
  Number: undefined,
  Point: undefined,
  Polygon: undefined,
  Rectangle: undefined,
  Select: undefined,
  Text: undefined,
};

export const definitionKinds: DefinitionKind[] = Object.keys(kinds).map(
  (key) => key as DefinitionKind
);
