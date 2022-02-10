import { SnapshotIn, types } from "mobx-state-tree";

export const FieldDefinitionChange = types.enumeration([
  "EveryFrame",
  "FrameChanges",
  "Singleton",
]);

export const FieldDescriptionBase = types
  .model("FieldDescriptionBase", {
    id: types.string,
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
    id: types.string,
    currentFrame: types.string,
  })
  .actions((self) => ({
    setCurrentFrame(currentFrame: string) {
      self.currentFrame = currentFrame;
    },
  }));
