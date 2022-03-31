import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Group, Rect, Text } from "react-konva";
import { Field, WorkspaceStore } from "renderer/models";
import { useTimelineConfig } from "../../../TimelineContext/TimelineContext";

type Props = {
  field: Instance<typeof Field>;
  position: number;
  workspaceStore: Instance<typeof WorkspaceStore>;
};

export const FieldRow = observer(
  ({ field, position, workspaceStore }: Props): ReactElement => {
    const { rowHeight, selectionColor, deselectionColor } = useTimelineConfig();

    return (
      <Group x={0} y={position * rowHeight} height={rowHeight}>
        <Rect
          width={workspaceStore.framesCount}
          height={rowHeight}
          fill={field.selected ? selectionColor : deselectionColor}
        ></Rect>
        <Text
          x={0}
          y={0}
          text={field.definition.name}
          fill="white"
          height={rowHeight}
        />
      </Group>
    );
  }
);
