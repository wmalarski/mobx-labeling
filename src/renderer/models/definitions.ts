import { types } from "mobx-state-tree";
import { Box3dDefinition } from "./fields/box3d";
import { CheckBoxDefinition } from "./fields/checkBox";
import { ComboBoxDefinition } from "./fields/comboBox";
import { EyeDefinition } from "./fields/eye";
import { GraphDefinition } from "./fields/graph";
import { LineDefinition } from "./fields/line";
import { MultiSelectDefinition } from "./fields/multiSelect";
import { NumberDefinition } from "./fields/number";
import { PointDefinition } from "./fields/point";
import { PolygonDefinition } from "./fields/polygon";
import { RectangleDefinition } from "./fields/rectangle";
import { SelectDefinition } from "./fields/select";
import { TextDefinition } from "./fields/text";

const FieldDefinition1 = types.union(
  Box3dDefinition,
  CheckBoxDefinition,
  ComboBoxDefinition,
  EyeDefinition,
  GraphDefinition,
  LineDefinition,
  MultiSelectDefinition,
  NumberDefinition,
  PointDefinition
);

const FieldDefinition2 = types.union(
  PolygonDefinition,
  RectangleDefinition,
  SelectDefinition,
  TextDefinition
);

export const FieldDefinition = types.union(FieldDefinition1, FieldDefinition2);

export const ObjectDefinition = types.model({
  id: types.string,
  name: types.string,
  info: types.maybeNull(types.string),
  fields: types.array(FieldDefinition),
});

export const ProjectDefinition = types.model({
  id: types.string,
  name: types.string,
  info: types.maybeNull(types.string),
  objects: types.array(ObjectDefinition),
});
