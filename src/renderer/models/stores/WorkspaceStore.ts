import { getSnapshot, Instance, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { FieldDefinition } from "../definition/FieldDefinition";
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
      const definition = ItemDefinition.create(getSnapshot(itemDefinition));

      const fieldCopies = itemDefinition.fields.map((fieldDefinition) =>
        FieldDefinition.create(getSnapshot(fieldDefinition))
      );

      const fields = fieldCopies.map((fieldDefinition) => ({
        currentFrame: self.currentFrame,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        definition: fieldDefinition as any,
      }));

      self.batch.items.push(
        Item.create({
          name: nanoid(),
          definition,
          fields,
          currentFrame: self.currentFrame,
          ranges: [{ start: self.currentFrame, end: self.currentFrame }],
        })
      );
      console.log(self.batch.items.length);
    },
  }));

export type ProjectRoot = ReturnType<
  Instance<typeof WorkspaceStore>["projectRoot"]
>;
