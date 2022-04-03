import { getSnapshot, Instance } from "mobx-state-tree";
import { Field, Item, SingletonKey } from "renderer/models";

export type FieldRange = {
  end: number;
  label: string;
  start: number;
};

type GetFieldRangesOptions = {
  field: Instance<typeof Field>;
  framesCount: number;
  item: Instance<typeof Item>;
};

export const getFieldRanges = ({
  field,
  framesCount,
}: GetFieldRangesOptions): FieldRange[] => {
  switch (field.definition.change) {
    case "Singleton": {
      const value = field.values.get(SingletonKey);
      if (!value) return [];
      const label = JSON.stringify(getSnapshot(value), null, 2);
      return [{ start: 0, end: framesCount - 1, label }];
    }
    case "EveryFrame": {
      return [];
    }
    case "FrameChanges": {
      const values = Object.entries(getSnapshot(field.values)).map(
        ([frame, value]) => {
          return { frame: Number(frame), value };
        }
      );
      return [];
    }
  }
};
