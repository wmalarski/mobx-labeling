import { types } from "mobx-state-tree";
import { nanoid } from "nanoid";

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
