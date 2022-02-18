import { getSnapshot, Instance, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { DropResult } from "react-beautiful-dnd";
import { DefinitionNodeKind } from "../../types";
import { FieldDefinition } from "../FieldDefinition";
import { ItemDefinition } from "../ItemDefinition";

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
