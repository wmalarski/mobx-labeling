import { types } from "mobx-state-tree";
import { ObjectDefinition, ProjectDefinition } from "./definitions";
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

export const Object = types.model("Object", {
  id: types.string,
  name: types.string,
  definition: ObjectDefinition,
});

export const Resource = types.model("Project", {
  id: types.string,
  path: types.string,
  fps: types.string,
});

export const Project = types.model("Project", {
  id: types.string,
  name: types.string,
  definition: ProjectDefinition,
  resources: types.array(Resource),
});
