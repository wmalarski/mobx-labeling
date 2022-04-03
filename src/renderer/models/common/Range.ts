import { types } from "mobx-state-tree";

export const Range = types
  .model("Range", {
    start: types.number,
    end: types.number,
  })
  .actions((self) => ({
    setStart(start: number) {
      self.start = start;
    },
    setEnd(end: number) {
      self.end = end;
    },
  }));
