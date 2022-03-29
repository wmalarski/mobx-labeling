import { Instance } from "mobx-state-tree";
import { Item, WorkspaceStore } from "renderer/models";

export type ItemPosition = {
  item: Instance<typeof Item>;
  size: number;
  position: number;
};

export const getItemPositions = (
  workspaceStore: Instance<typeof WorkspaceStore>
): ItemPosition[] => {
  return workspaceStore.batch.items.reduce<ItemPosition[]>((prev, item) => {
    const last = prev.at(-1);

    const lastPosition = last?.position ?? 0;
    const lastSize = last?.size ?? 0;

    const position = lastPosition + lastSize;
    const size = 1 + (item.toggled ? item.fields.length : 0);

    return [...prev, { item, position, size }];
  }, []);
};
