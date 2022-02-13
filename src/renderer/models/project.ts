import { types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { ItemDefinition, ProjectDefinition } from "./definition";
import { Box3dField } from "./fields/box3d";
import { CheckBoxField } from "./fields/checkBox";
import { ComboBoxField } from "./fields/comboBox";
import { EyeField } from "./fields/eye";
import { GraphField } from "./fields/graph";
import { LineField } from "./fields/line";
import { MultiSelectField } from "./fields/multiSelect";
import { NumberField } from "./fields/number";
import { PointField } from "./fields/point";
import { PolygonField } from "./fields/polygon";
import { RectangleField } from "./fields/rectangle";
import { SelectField } from "./fields/select";
import { TextField } from "./fields/text";

const Field1 = types.union(
  Box3dField,
  CheckBoxField,
  ComboBoxField,
  EyeField,
  GraphField,
  LineField,
  MultiSelectField,
  NumberField,
  PointField
);

const Field2 = types.union(
  PolygonField,
  RectangleField,
  SelectField,
  TextField
);

export const Field = types.union(Field1, Field2);

export const Item = types.model("Item", {
  id: types.optional(types.identifier, nanoid),
  name: types.string,
  fields: types.array(Field),
  definition: ItemDefinition,
});

export const Resource = types.model("Resource", {
  id: types.optional(types.identifier, nanoid),
  path: types.string,
  fps: types.string,
});

export const Project = types.model("Project", {
  id: types.optional(types.identifier, nanoid),
  name: types.string,
  definition: ProjectDefinition,
  items: types.array(Item),
  resources: types.array(Resource),
  createdAt: types.optional(types.Date, () => new Date()),
  updatedAt: types.optional(types.Date, () => new Date()),
});
