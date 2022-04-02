import { getSnapshot, SnapshotOut, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { ItemDefinition } from "../../definition/ItemDefinition/ItemDefinition";
import { CurrentFrame } from "../CurrentFrame";
import { Field } from "../Field";
import { Range } from "../Range";

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
    currentFrame: types.reference(CurrentFrame),
    selected: types.optional(types.boolean, false),
    toggled: types.optional(types.boolean, false),
    hovered: types.optional(types.boolean, false),
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
    setName(name: string) {
      self.name = name;
    },
    setBlocked(blocked: boolean) {
      self.blocked = blocked;
      self.fields.forEach((field) => {
        field.setBlocked(blocked);
      });
    },
    setSelected(selected: boolean) {
      self.selected = selected;
    },
    setToggled(toggled: boolean) {
      self.toggled = toggled;
    },
    setHovered(hovered: boolean) {
      self.hovered = hovered;
    },
    addCurrentFrame() {
      const frame = self.currentFrame.frame;

      const inside = self.ranges.some((range) => {
        return range.start <= frame && frame <= range.end;
      });
      if (inside) return;

      const left = self.ranges.find((range) => range.end + 1 === frame);
      const right = self.ranges.find((range) => range.start - 1 === frame);
      if (right && left) {
        left.setEnd(right.end);
        self.ranges.remove(right);
      } else if (right) {
        right.setStart(frame);
      } else if (left) {
        left.setEnd(frame);
      } else {
        const range = Range.create({ start: frame, end: frame });
        self.ranges.push(range);
      }
    },
  }));
