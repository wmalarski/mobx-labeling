import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Rect, Text } from "react-konva";
import { Item, WorkspaceStore } from "renderer/models";
import { useTimelineConfig } from "../../../TimelineContext/TimelineContext";

type Props = {
  item: Instance<typeof Item>;
  workspaceStore: Instance<typeof WorkspaceStore>;
  position: number;
};

export const ItemRow = ({ item, position }: Props): ReactElement => {
  const { rowHeight, deselectionColor, selectionColor } = useTimelineConfig();

  return (
    <Rect
      x={0}
      y={position * rowHeight}
      width={100}
      height={rowHeight}
      fill={item.selected ? selectionColor : deselectionColor}
    >
      <Text
        x={0}
        y={0}
        text={item.definition.name}
        fill="white"
        fontSize={rowHeight / 2}
        padding={2}
        height={rowHeight}
      />
    </Rect>
  );
};
