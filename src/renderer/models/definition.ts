import { getSnapshot, Instance, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { DraggableLocation, DropResult } from "react-beautiful-dnd";
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
import { DefinitionNodeKind } from "./utils";

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

export const ItemDefinition = types
  .model("ItemDefinition", {
    id: types.optional(types.identifier, nanoid),
    name: types.string,
    description: types.optional(types.string, ""),
    fields: types.array(FieldDefinition),
  })
  .actions((self) => ({
    addNewField(fieldName: string) {
      const field = ComboBoxDefinition.create({ name: fieldName });
      self.fields.push(field);
      return field;
    },
    putField(field: Instance<typeof FieldDefinition>, at: number) {
      self.fields.splice(at, 0, field);
    },
    removeField(field: Instance<typeof FieldDefinition>) {
      self.fields.remove(field);
    },
    copyField(field: Instance<typeof FieldDefinition>, fieldName: string) {
      const copy = FieldDefinition.create({
        ...getSnapshot(field),
        name: fieldName,
        id: undefined,
      });
      self.fields.push(copy);
      return copy;
    },
    reorderFields(source: DraggableLocation, destination: DraggableLocation) {
      const [removed] = self.fields.splice(source.index, 1);
      const field = FieldDefinition.create(getSnapshot(removed));
      self.fields.splice(destination.index, 0, field);
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
  }))
  .views((self) => ({
    field(id: string) {
      return self.fields.find((field) => field.id === id);
    },
  }));

export const ProjectDefinition = types
  .model("ProjectDefinition", {
    id: types.optional(types.identifier, nanoid),
    name: types.string,
    description: types.optional(types.string, ""),
    items: types.array(ItemDefinition),
    createdAt: types.optional(types.Date, () => new Date()),
    updatedAt: types.optional(types.Date, () => new Date()),
  })
  .actions((self) => ({
    addNewItem(name: string) {
      const item = ItemDefinition.create({ name });
      self.items.push(getSnapshot(item));
      return item;
    },
    removeItem(item: Instance<typeof ItemDefinition>) {
      self.items.remove(item);
    },
    copyItem(item: Instance<typeof ItemDefinition>, name: string) {
      const copy = ItemDefinition.create({
        ...getSnapshot(item),
        name,
        id: undefined,
      });
      self.items.push(copy);
      return copy;
    },
    reorder({ source, destination, type }: DropResult) {
      if (
        !destination ||
        (source.droppableId === destination.droppableId &&
          source.index === destination.index)
      ) {
        return;
      }

      if (type === DefinitionNodeKind.Item) {
        const [removed] = self.items.splice(source.index, 1);
        const item = ItemDefinition.create(getSnapshot(removed));
        self.items.splice(destination.index, 0, item);
        return;
      }

      const srcItem = self.items.find((item) => item.id === source.droppableId);
      const destItem = self.items.find((i) => i.id === destination.droppableId);

      if (!srcItem || !destItem) return;

      if (source.droppableId === destination.droppableId) {
        srcItem.reorderFields(source, destination);
        return;
      }

      const srcField = srcItem.fields[source.index];
      const newField = FieldDefinition.create(getSnapshot(srcField));

      srcItem.removeField(srcField);
      destItem.putField(newField, destination.index);
    },
    setName(name: string) {
      self.name = name;
    },
    setDescription(description: string) {
      self.description = description;
    },
  }))
  .views((self) => ({
    item(id: string) {
      return self.items.find((item) => item.id === id);
    },
  }));
