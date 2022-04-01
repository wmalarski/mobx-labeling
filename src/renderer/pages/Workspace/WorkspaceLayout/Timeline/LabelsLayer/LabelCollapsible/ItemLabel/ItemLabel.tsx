import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement, useRef } from "react";
import { Group, Rect, Text } from "react-konva";
import { Item, WorkspaceStore } from "renderer/models";
import { useTimelineConfig } from "../../../TimelineContext/TimelineContext";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
  item: Instance<typeof Item>;
  width: number;
};

export const ItemLabel = observer(
  ({ item, workspaceStore, width }: Props): ReactElement => {
    const {
      labelsWidth,
      rowHeight,
      deselectionColor,
      selectionColor,
      hoverColor,
      foregroundColor,
    } = useTimelineConfig();

    const arrowRef = useRef<Konva.Text>(null);

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

    const handleClickArrow = (event: KonvaEventObject<MouseEvent>) => {
      event.cancelBubble = true;
      item.setToggled(!item.toggled);
      arrowRef.current?.to({ rotation: item.toggled ? 180 : 0 });
    };

    return (
      <Group
        onMouseOver={handleMouseOverGroup}
        onMouseOut={handleMouseOutGroup}
        onClick={handleClickGroup}
      >
        <Rect
          width={width}
          height={rowHeight}
          fill={
            item.selected
              ? selectionColor
              : item.hovered
              ? hoverColor
              : deselectionColor
          }
        />
        <Text
          ref={arrowRef}
          text="▼"
          x={5}
          y={rowHeight / 2}
          offsetX={6}
          offsetY={5}
          fill={foregroundColor}
        />
        <Rect
          x={0}
          y={0}
          width={15}
          height={rowHeight}
          onClick={handleClickArrow}
        />
        <Text
          x={15}
          y={rowHeight / 2 - 8}
          text={item.name}
          fill={foregroundColor}
          width={labelsWidth - 15}
          fontStyle={item.selected ? "bold" : "normal"}
          ellipsis
          wrap="none"
        />
      </Group>
    );
  }
);
