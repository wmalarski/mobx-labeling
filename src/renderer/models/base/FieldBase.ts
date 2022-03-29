import { types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { CurrentFrame } from "../project/CurrentFrame";

export const FieldBase = types
  .model("FieldBase", {
    id: types.optional(types.identifier, nanoid),
    currentFrame: types.reference(CurrentFrame),
    blocked: types.optional(types.boolean, false),
    selected: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setBlocked(blocked: boolean) {
      self.blocked = blocked;
    },
    setSelected(selected: boolean) {
      self.selected = selected;
    },
  }));
