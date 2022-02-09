import { types } from "mobx-state-tree";
import {
  CheckBoxDefinition,
  ComboBoxDefinition,
  EyeDefinition,
  GraphDefinition,
  LineDefinition,
  MultiSelectDefinition,
  NumberDefinition,
  PointDefinition,
  PolygonDefinition,
  RectangleDefinition,
  SelectDefinition,
  TextDefinition,
} from "./fields";
import { Box3dDefinition } from "./fields/box3d";

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

export const Definition = types.model({
  id: types.string,
  name: types.string,
  info: types.maybeNull(types.string),
  objects: types.array(ObjectDefinition),
});
