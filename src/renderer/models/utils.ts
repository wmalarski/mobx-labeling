import { Instance } from "mobx-state-tree";
import { FieldDefinitionBase } from "./base";

export enum DefinitionNodeKind {
  Item = "Item",
  Field = "Field",
}

type FieldModel<V> = {
  currentFrame: string;
  definition: Instance<typeof FieldDefinitionBase>;
  values: {
    get: (key: string) => V;
  };
};

export const currentValue = <V>(self: FieldModel<V>): V => {
  switch (self.definition.change) {
    case "EveryFrame":
    case "FrameChanges":
      return self.values.get(self.currentFrame);
    case "Singleton":
      return self.values.get("All");
  }
};
