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
    fields: types.array(Field),
    definition: ItemDefinition,
    ranges: types.array(Range),
  })
  .views((self) => ({
    info(): ItemInfo {
      return {
        id: self.id,
        ranges: getSnapshot(self.ranges),
      };
    },
  }));
