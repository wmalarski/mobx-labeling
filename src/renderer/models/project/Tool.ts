import { Instance, types } from "mobx-state-tree";
import { Field } from "./Field";

export enum ToolKind {
  Selector = "Selector",
  Drag = "Drag",
  Creator = "Creator",
}

export const Tool = types
  .model("Tool", {
    kind: types.enumeration("ToolKind", Object.keys(ToolKind)),
    field: types.maybeNull(Field),
  })
  .actions((self) => ({
    setSelector() {
      self.kind = ToolKind.Selector;
      self.field = null;
    },
    setDrag() {
      self.kind = ToolKind.Drag;
      self.field = null;
    },
    setCreator(field: Instance<typeof Field>) {
      self.kind = ToolKind.Creator;
      self.field = field;
    },
  }));
