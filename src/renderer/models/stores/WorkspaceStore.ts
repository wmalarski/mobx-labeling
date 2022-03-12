import { getSnapshot, Instance, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { Batch } from "../project/Batch";
import { Project } from "../project/Project";

export const WorkspaceStore = types
  .model("WorkspaceStore", {
    project: Project,
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
  }));

export type ProjectRoot = ReturnType<
  Instance<typeof WorkspaceStore>["projectRoot"]
>;
