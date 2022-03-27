import { types } from "mobx-state-tree";
import { nanoid } from "nanoid";

export const FieldBase = types
  .model("FieldBase", {
    id: types.optional(types.identifier, nanoid),
    currentFrame: types.number,
    blocked: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setCurrentFrame(currentFrame: number) {
      self.currentFrame = currentFrame;
    },
    setBlocked(blocked: boolean) {
      self.blocked = blocked;
    },
  }));
