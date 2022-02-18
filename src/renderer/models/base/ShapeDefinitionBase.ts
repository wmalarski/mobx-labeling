import { types } from "mobx-state-tree";
import { FieldDefinitionBase } from "./FieldDefinitionBase";

export const ShapeDefinitionBase = types
  .compose(
    "ShapeDefinitionBase",
    FieldDefinitionBase,
    types.model({
      color: types.optional(types.string, "hsl(0, 100%, 50%)"),
    })
  )
  .actions((self) => ({
    setColor(color: string) {
      self.color = color;
    },
  }));
