import { Instance } from "mobx-state-tree";
import { FieldDefinitionBase } from "../base/FieldDefinitionBase";

type FieldModel<V> = {
  currentFrame: number;
  definition: Instance<typeof FieldDefinitionBase>;
  values: {
    get: (key: string) => V;
  };
};

export const currentValueKey = <V>(self: FieldModel<V>): string => {
  switch (self.definition.change) {
    case "EveryFrame":
    case "FrameChanges":
      return String(self.currentFrame);
    case "Singleton":
      return "All";
  }
};

export const currentValue = <V>(self: FieldModel<V>): V => {
  const key = currentValueKey(self);
  return self.values.get(key);
};
