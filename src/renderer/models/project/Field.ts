import { types } from "mobx-state-tree";
import { Box3dField } from "../fields/Box3d";
import { CheckBoxField } from "../fields/CheckBox";
import { ComboBoxField } from "../fields/ComboBox";
import { EyeField } from "../fields/Eye";
import { GraphField } from "../fields/Graph";
import { LineField } from "../fields/Line";
import { MultiSelectField } from "../fields/MultiSelect";
import { NumberField } from "../fields/Number";
import { PointField } from "../fields/Point";
import { PolygonField } from "../fields/Polygon";
import { RectangleField } from "../fields/Rectangle";
import { SelectField } from "../fields/Select";
import { TextField } from "../fields/Text";

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
