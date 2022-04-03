import { KonvaEventObject } from "konva/lib/Node";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Group, Rect, Text } from "react-konva";
import { Field, WorkspaceStore } from "renderer/models";
import { useTimelineConfig } from "../../TimelineContext/TimelineContext";

type Props = {
  field: Instance<typeof Field>;
  position: number;
  workspaceStore: Instance<typeof WorkspaceStore>;
};

export const FieldLabel = observer(
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
        height={config.rowHeight}
        onClick={handleClickGroup}
        onMouseOut={handleMouseOutGroup}
        onMouseOver={handleMouseOverGroup}
        width={config.labelsWidth}
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
          width={config.labelsWidth}
        />
        <Text
          ellipsis
          fill={config.foregroundColor}
          fontStyle={field.selected ? "bold" : "normal"}
          text={field.definition.name}
          width={config.labelsWidth - 15}
          wrap="none"
          x={15}
          y={config.rowHeight / 2 - 8}
        />
      </Group>
    );
  }
);
