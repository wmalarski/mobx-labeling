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

export const ShapeDefinitionBase = types
  .compose(
    "ShapeDefinitionBase",
    FieldDefinitionBase,
    types.model({
      color: types.optional(types.string, "hsl(0, 100%, 50%)"),
    })
  )
  .actions((self) => ({
    setColor(color: string) {
      self.color = color;
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
