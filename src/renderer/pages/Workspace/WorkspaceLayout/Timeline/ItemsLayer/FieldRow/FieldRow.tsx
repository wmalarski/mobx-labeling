import { KonvaEventObject } from "konva/lib/Node";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Group, Rect, Text } from "react-konva";
import { Field, Item, WorkspaceStore } from "renderer/models";
import { useTimelineConfig } from "../../TimelineContext/TimelineContext";
import { getFieldRanges } from "./FieldRow.utils";

type Props = {
  field: Instance<typeof Field>;
  item: Instance<typeof Item>;
  position: number;
  workspaceStore: Instance<typeof WorkspaceStore>;
};

export const FieldRow = observer(
  ({ field, item, position, workspaceStore }: Props): ReactElement => {
    const config = useTimelineConfig();

    const handleMouseOverGroup = () => {
      field.setHovered(true);
    };

    const handleMouseOutGroup = () => {
      field.setHovered(false);
    };

    const handleClickGroup = (event: KonvaEventObject<MouseEvent>) => {
      if (!event.evt.ctrlKey) workspaceStore.deselectAll();
      field.setSelected(!field.selected);
    };

    const ranges = getFieldRanges({
      framesCount: workspaceStore.framesCount,
      field,
      item,
    });

    return (
      <Group
        height={config.rowHeight}
        onClick={handleClickGroup}
        onMouseOut={handleMouseOutGroup}
        onMouseOver={handleMouseOverGroup}
        y={position * config.rowHeight}
      >
        <Rect
          fill={
            field.selected
              ? config.selectionColor
              : field.hovered
              ? config.hoverColor
              : config.deselectionColor
          }
          height={config.rowHeight}
          width={workspaceStore.framesCount}
        />
        <Text text={field.definition.name} fill={config.foregroundColor} />
      </Group>
    );
  }
);
