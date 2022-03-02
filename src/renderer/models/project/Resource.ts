import { types } from "mobx-state-tree";
import { nanoid } from "nanoid";

export const Resource = types
  .model("Resource", {
    id: types.optional(types.identifier, nanoid),
    path: types.string,
    fps: types.number,
    frameShift: types.number,
  })
  .actions((self) => ({
    setFps(fps: number) {
      self.fps = fps;
    },
    setFrameShift(frameShift: number) {
      self.frameShift = frameShift;
    },
  }));
