import { Instance } from "mobx-state-tree";
import { FieldDefinitionBase } from "../base/FieldDefinitionBase";

type FieldModel<V> = {
  currentFrame: number;
  definition?: Instance<typeof FieldDefinitionBase>;
  values: {
    get: (key: string) => V;
  };
};

export const currentValue = <V>(self: FieldModel<V>): V => {
  switch (self.definition?.change) {
    case "EveryFrame":
    case "FrameChanges":
      return self.values.get(String(self.currentFrame));
    case "Singleton":
      return self.values.get("All");
    default:
      return self.values.get("All");
  }
};
