import { getSnapshot, Instance, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
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

export const ObjectDefinition = types
  .model("ObjectDefinition", {
    id: types.optional(types.identifier, nanoid),
    name: types.string,
    description: types.optional(types.string, ""),
    fields: types.array(FieldDefinition),
  })
  .actions((self) => ({
    addNewField(fieldName: string) {
      const newField = ComboBoxDefinition.create({ name: fieldName });
      self.fields.push(newField);
    },
    removeField(field: Instance<typeof FieldDefinition>) {
      self.fields.remove(field);
    },
    copyField(field: Instance<typeof FieldDefinition>, fieldName: string) {
      self.fields.push(
        FieldDefinition.create({
          ...getSnapshot(field),
          name: fieldName,
          id: undefined,
        })
      );
    },
    changeKind(field: Instance<typeof FieldDefinition>, kind: DefinitionKind) {
      const index = self.fields.indexOf(field);
      const newField = FieldDefinition.create({
        id: field.id,
        name: field.name,
        description: field.description,
        change: field.change,
        kind,
      });
      self.fields.splice(index, 1, newField);
    },
    setName(name: string) {
      self.name = name;
    },
    setDescription(description: string) {
      self.description = description;
    },
  }));

export const ProjectDefinition = types
  .model("ProjectDefinition", {
    id: types.optional(types.identifier, nanoid),
    name: types.string,
    description: types.optional(types.string, ""),
    objects: types.array(ObjectDefinition),
    createdAt: types.optional(types.Date, () => new Date()),
    updatedAt: types.optional(types.Date, () => new Date()),
  })
  .actions((self) => ({
    addNewObject(objectName: string) {
      const newObject = ObjectDefinition.create({ name: objectName });
      self.objects.push(getSnapshot(newObject));
    },
    removeObject(object: Instance<typeof ObjectDefinition>) {
      self.objects.remove(object);
    },
    copyObject(object: Instance<typeof ObjectDefinition>, objectName: string) {
      self.objects.push({
        ...getSnapshot(object),
        name: objectName,
        id: undefined,
      });
    },
    setName(name: string) {
      self.name = name;
    },
    setDescription(description: string) {
      self.description = description;
    },
  }));
