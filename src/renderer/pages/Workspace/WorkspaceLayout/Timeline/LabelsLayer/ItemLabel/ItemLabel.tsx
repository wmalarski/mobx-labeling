import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement, useRef } from "react";
import { Group, Rect, Text } from "react-konva";
import { Item, WorkspaceStore } from "renderer/models";
import { useTimelineConfig } from "../../TimelineContext/TimelineContext";

type Props = {
  item: Instance<typeof Item>;
  workspaceStore: Instance<typeof WorkspaceStore>;
};

export const ItemLabel = observer(
  ({ item, workspaceStore }: Props): ReactElement => {
    const config = useTimelineConfig();

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

    const handleDblClick = () => {
      item.setToggled(!item.toggled);
    };

    return (
      <Group
        onClick={handleClickGroup}
        onDblClick={handleDblClick}
        onMouseOut={handleMouseOutGroup}
        onMouseOver={handleMouseOverGroup}
      >
        <Rect
          fill={
            item.selected
              ? config.selectionColor
              : item.hovered
              ? config.hoverColor
              : config.deselectionColor
          }
          height={config.rowHeight}
          width={config.labelsWidth}
        />
        <Text
          fill={config.foregroundColor}
          offsetX={6}
          offsetY={5}
          ref={arrowRef}
          text="▼"
          x={5}
          y={config.rowHeight / 2}
        />
        <Rect height={config.rowHeight} onClick={handleClickArrow} width={15} />
        <Text
          ellipsis
          fill={config.foregroundColor}
          fontStyle={item.selected ? "bold" : "normal"}
          text={item.name}
          width={config.labelsWidth - 15}
          wrap="none"
          x={15}
          y={config.rowHeight / 2 - 8}
        />
      </Group>
    );
  }
);
