import { getSnapshot, SnapshotOut, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { ItemDefinition } from "../definition/ItemDefinition/ItemDefinition";
import { Field } from "./Field";
import { Range } from "./Range";

export type ItemInfo = {
  id: string;
  ranges: SnapshotOut<typeof Range>[];
};

export const Item = types
  .model("Item", {
    id: types.optional(types.identifier, nanoid),
    name: types.string,
    blocked: types.optional(types.boolean, false),
    fields: types.array(Field),
    definition: types.reference(ItemDefinition),
    ranges: types.array(Range),
    currentFrame: types.optional(types.number, 0),
  })
  .views((self) => ({
    info(): ItemInfo {
      return {
        id: self.id,
        ranges: getSnapshot(self.ranges),
      };
    },
  }))
  .actions((self) => ({
    setCurrentFrame(currentFrame: number) {
      self.currentFrame = currentFrame;
    },
    setName(name: string) {
      self.name = name;
    },
    setBlocked(blocked: boolean) {
      self.blocked = blocked;
    },
  }));
