import { Instance } from "mobx-state-tree";
import { FieldDefinitionBase } from "../base/FieldDefinitionBase";

type FieldModel<V> = {
  currentFrame: { frame: number };
  definition: Instance<typeof FieldDefinitionBase>;
  values: {
    get: (key: string) => V;
  };
};

export const SingletonKey = "All";

export const currentValueKey = <V>(self: FieldModel<V>): string => {
  switch (self.definition.change) {
    case "EveryFrame":
    case "FrameChanges":
      return String(self.currentFrame.frame);
    case "Singleton":
      return SingletonKey;
  }
};

export const currentValue = <V>(self: FieldModel<V>): V => {
  const key = currentValueKey(self);
  return self.values.get(key);
};

export const toPairs = (flattened: number[]): number[][] => {
  return flattened.reduce<number[][]>((prev, curr, index, array) => {
    if (index % 2 === 1 || index >= array.length) return prev;
    return [...prev, [curr, array[index + 1]]];
  }, []);
};
