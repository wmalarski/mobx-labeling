import { types } from "mobx-state-tree";
import { Item, ItemInfo } from "./Item";

export const Batch = types
  .model("Batch", {
    id: types.identifier,
    items: types.array(Item),
  })
  .views((self) => ({
    itemsInfo(): ItemInfo[] {
      return self.items.map((item) => item.info());
    },
  }));
