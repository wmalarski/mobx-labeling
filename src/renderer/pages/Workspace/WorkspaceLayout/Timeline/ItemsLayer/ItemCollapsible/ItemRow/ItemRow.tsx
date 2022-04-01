import { KonvaEventObject } from "konva/lib/Node";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Group, Rect, Text } from "react-konva";
import { Item, WorkspaceStore } from "renderer/models";
import { useTimelineConfig } from "../../../TimelineContext/TimelineContext";

type Props = {
  item: Instance<typeof Item>;
  workspaceStore: Instance<typeof WorkspaceStore>;
};

export const ItemRow = observer(
  ({ item, workspaceStore }: Props): ReactElement => {
    const {
      rowHeight,
      deselectionColor,
      selectionColor,
      foregroundColor,
      hoverColor,
    } = useTimelineConfig();

    const handleMouseOverGroup = () => {
      item.setHovered(true);
    };

    const handleMouseOutGroup = () => {
      item.setHovered(false);
    };

    const handleClickGroup = (event: KonvaEventObject<MouseEvent>) => {
      if (!event.evt.ctrlKey) workspaceStore.deselectAll();
      item.setSelected(!item.selected);
    };

    return (
      <Group
        onMouseOver={handleMouseOverGroup}
        onMouseOut={handleMouseOutGroup}
        onClick={handleClickGroup}
      >
        <Rect
          width={workspaceStore.framesCount}
          height={rowHeight}
          fill={
            item.selected
              ? selectionColor
              : item.hovered
              ? hoverColor
              : deselectionColor
          }
        />
        <Text text={item.name} height={rowHeight} fill={foregroundColor} />
      </Group>
    );
  }
);
