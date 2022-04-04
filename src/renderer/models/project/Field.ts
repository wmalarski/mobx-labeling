import { Instance, types } from "mobx-state-tree";
import { Box3dField, isEqualBox3d } from "../fields/Box3d";
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
  EyeField,
  GraphField,
  LineField,
  PolygonField,
  PointField
);

const Field2 = types.union(
  CheckBoxField,
  ComboBoxField,
  MultiSelectField,
  RectangleField,
  NumberField,
  SelectField,
  TextField
);

export const Field = types.union(Field1, Field2);

export const isEqual = (
  first: Instance<typeof Field>,
  second: Instance<typeof Field>,
  frame: number
): boolean => {
  if (first.kind !== second.kind) return false;

  const key = String(frame);

  switch (first.kind) {
    case "Box3d": {
      const firstValue = first.values.get(key);
      const secondValue = second.values.get(key);

      return isEqualBox3d(first);
    }
  }

  return false;
};
