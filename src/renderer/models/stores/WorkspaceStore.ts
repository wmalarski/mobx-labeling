import { getSnapshot, Instance, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { Batch } from "../project/Batch";
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
  }));

export type ProjectRoot = ReturnType<
  Instance<typeof WorkspaceStore>["projectRoot"]
>;
