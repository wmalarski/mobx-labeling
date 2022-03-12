import { getSnapshot, Instance, types } from "mobx-state-tree";
import { Batch } from "../project/Batch";
import { Project } from "../project/Project";

export const WorkspaceStore = types
  .model("WorkspaceStore", {
    project: Project,
    batch: Batch,
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
