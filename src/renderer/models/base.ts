import { SnapshotIn, types } from "mobx-state-tree";
import { nanoid } from "nanoid";

export const FieldDefinitionChange = types.enumeration([
  "EveryFrame",
  "FrameChanges",
  "Singleton",
]);

export const FieldDescriptionBase = types
  .model("FieldDescriptionBase", {
    id: types.optional(types.identifier, nanoid),
    name: types.string,
    description: types.maybeNull(types.string),
    change: FieldDefinitionChange,
  })
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
    setDescription(description: string) {
      self.description = description;
    },
    setChange(change: SnapshotIn<typeof FieldDefinitionChange>) {
      self.change = change;
    },
  }));

export const FieldBase = types
  .model("FieldBase", {
    id: types.optional(types.identifier, nanoid),
    currentFrame: types.string,
  })
  .actions((self) => ({
    setCurrentFrame(currentFrame: string) {
      self.currentFrame = currentFrame;
    },
  }));
