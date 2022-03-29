import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Rect, Text } from "react-konva";
import { Field } from "renderer/models";
import { useTimelineConfig } from "../../../Timeline.utils";

type Props = {
  field: Instance<typeof Field>;
  position: number;
};

export const FieldRow = ({ field, position }: Props): ReactElement => {
  const { rowHeight } = useTimelineConfig();

  return (
    <Rect x={0} y={position * rowHeight} width={100} height={rowHeight}>
      <Text
        x={0}
        y={0}
        text={field.definition.name}
        fill="white"
        fontSize={rowHeight / 2}
        padding={2}
        height={rowHeight}
      />
    </Rect>
  );
};
