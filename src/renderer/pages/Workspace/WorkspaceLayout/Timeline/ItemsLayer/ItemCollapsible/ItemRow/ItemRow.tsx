import { KonvaEventObject } from "konva/lib/Node";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Group, Rect } from "react-konva";
import { Item, WorkspaceStore } from "renderer/models";
import { useTimelineConfig } from "../../../TimelineContext/TimelineContext";

type Props = {
  item: Instance<typeof Item>;
  workspaceStore: Instance<typeof WorkspaceStore>;
};

export const ItemRow = observer(
  ({ item, workspaceStore }: Props): ReactElement => {
    const config = useTimelineConfig();

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
          height={config.rowHeight}
          fill={
            item.selected
              ? config.selectionColor
              : item.hovered
              ? config.hoverColor
              : config.deselectionColor
          }
        />
        {item.ranges.map((range) => (
          <Rect
            key={range.start}
            x={range.start}
            height={config.rowHeight}
            width={range.end - range.start}
            fill={config.rangeColor}
          />
        ))}
      </Group>
    );
  }
);
