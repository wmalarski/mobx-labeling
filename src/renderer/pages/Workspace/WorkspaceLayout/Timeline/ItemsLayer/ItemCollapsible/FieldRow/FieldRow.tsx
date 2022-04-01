import { KonvaEventObject } from "konva/lib/Node";
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

    return (
      <Group
        y={position * config.rowHeight}
        height={config.rowHeight}
        onMouseOver={handleMouseOverGroup}
        onMouseOut={handleMouseOutGroup}
        onClick={handleClickGroup}
      >
        <Rect
          width={workspaceStore.framesCount}
          height={config.rowHeight}
          fill={
            field.selected
              ? config.selectionColor
              : field.hovered
              ? config.hoverColor
              : config.deselectionColor
          }
        />
        <Text text={field.definition.name} fill={config.foregroundColor} />
      </Group>
    );
  }
);
