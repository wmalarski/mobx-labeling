import { types } from "mobx-state-tree";
import { nanoid } from "nanoid";

export const CurrentFrame = types
  .model("CurrentFrame", {
    id: types.optional(types.identifier, nanoid),
    frame: types.optional(types.number, 0),
  })
  .actions((self) => ({
    setFrame(frame: number) {
      self.frame = frame;
    },
  }));
