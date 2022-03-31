import { getSnapshot, Instance, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { ItemDefinition } from "../definition/ItemDefinition/ItemDefinition";
import { Batch } from "../project/Batch";
import { CurrentFrame } from "../project/CurrentFrame";
import { Item } from "../project/Item";
import { Project } from "../project/Project";
import { Tool, ToolKind } from "../project/Tool";

export const WorkspaceStore = types
  .model("WorkspaceStore", {
    project: Project,
    currentFrame: types.optional(CurrentFrame, () => {
      return CurrentFrame.create();
    }),
    framesCount: types.optional(types.number, 1),
    tool: types.optional(Tool, () => ({
      kind: ToolKind.Drag,
      field: null,
    })),
    batch: types.optional(Batch, () => ({
      id: nanoid(),
      items: [],
    })),
  })
  .views((self) => ({
    projectRoot() {
      return {
        ...getSnapshot(self.project),
        items: self.batch.itemsInfo(),
      };
    },
  }))
  .actions((self) => ({
    updateFramesCount(framesCount: number) {
      self.framesCount = Math.max(framesCount, self.framesCount);
    },
    addItem(itemDefinition: Instance<typeof ItemDefinition>) {
      const range = {
        start: self.currentFrame.frame,
        end: self.currentFrame.frame,
      };
      const item = Item.create({
        name: nanoid(),
        definition: itemDefinition.id,
        fields: itemDefinition.fields.map((fieldDefinition) => ({
          kind: fieldDefinition.kind,
          currentFrame: self.currentFrame.id,
          definition: fieldDefinition.id,
        })),
        currentFrame: self.currentFrame.id,
        ranges: [range],
        selected: true,
      });

      self.batch.items.forEach((item) => {
        item.setSelected(false);
      });
      self.batch.items.push(item);
    },
    removeItem(item: Instance<typeof Item>) {
      self.batch.items.remove(item);
    },
    deselectAll() {
      self.batch.items.forEach((item) => {
        item.setSelected(false);
        item.fields.forEach((field) => {
          field.setSelected(false);
        });
      });
    },
  }))
  .views((self) => ({
    get selectedItems() {
      return self.batch.items.filter((item) => item.selected);
    },
  }));

export type ProjectRoot = ReturnType<
  Instance<typeof WorkspaceStore>["projectRoot"]
>;
