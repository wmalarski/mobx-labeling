import { SnapshotIn, types } from "mobx-state-tree";
import { nanoid } from "nanoid";

export const FieldDefinitionChange = types.enumeration([
  "EveryFrame",
  "FrameChanges",
  "Singleton",
]);

export const FieldDefinitionBase = types
  .model("FieldDefinitionBase", {
    id: types.optional(types.identifier, nanoid),
    name: types.string,
    description: types.optional(types.string, ""),
    change: types.optional(FieldDefinitionChange, "EveryFrame"),
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
