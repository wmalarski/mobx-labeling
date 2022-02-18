import { getSnapshot, Instance, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { DraggableLocation } from "react-beautiful-dnd";
import { ComboBoxDefinition } from "../fields/ComboBox";
import { DefinitionKind, FieldDefinition } from "./FieldDefinition";

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
