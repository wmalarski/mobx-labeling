import { getSnapshot, Instance, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { ItemDefinition } from "../definition/ItemDefinition/ItemDefinition";
import { Batch } from "../project/Batch";
import { Item } from "../project/Item";
import { Project } from "../project/Project";
import { Tool, ToolKind } from "../project/Tool";

export const WorkspaceStore = types
  .model("WorkspaceStore", {
    project: Project,
    currentFrame: types.optional(types.number, 0),
    framesCount: types.optional(types.number, 1),
    selectedItems: types.array(types.reference(Item)),
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
    setCurrentFrame(currentFrame: number) {
      self.currentFrame = currentFrame;
      self.batch.items.forEach((item) => {
        item.setCurrentFrame(currentFrame);
      });
    },
    addItem(itemDefinition: Instance<typeof ItemDefinition>) {
      const item = Item.create({
        name: nanoid(),
        definition: itemDefinition.id,
        fields: itemDefinition.fields.map((fieldDefinition) => ({
          kind: fieldDefinition.kind,
          currentFrame: self.currentFrame,
          definition: fieldDefinition.id,
        })),
        currentFrame: self.currentFrame,
        ranges: [{ start: self.currentFrame, end: self.currentFrame }],
      });

      self.batch.items.push(item);
      self.selectedItems.replace([item]);
    },
    removeItem(item: Instance<typeof Item>) {
      self.selectedItems.remove(item);
      self.batch.items.remove(item);
    },
  }));

export type ProjectRoot = ReturnType<
  Instance<typeof WorkspaceStore>["projectRoot"]
>;
