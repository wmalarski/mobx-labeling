import { KonvaEventObject } from "konva/lib/Node";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Group, Rect } from "react-konva";
import { Item, WorkspaceStore } from "renderer/models";
import { useTimelineConfig } from "../../TimelineContext/TimelineContext";

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
          width={workspaceStore.framesCount}
        />
        {item.ranges.map((range) => (
          <Rect
            fill={config.rangeColor}
            height={config.rowHeight}
            key={range.start}
            width={range.end - range.start}
            x={range.start}
          />
        ))}
      </Group>
    );
  }
);
