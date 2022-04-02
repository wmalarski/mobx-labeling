import { KonvaEventObject } from "konva/lib/Node";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Group, Rect, Text } from "react-konva";
import { Field, WorkspaceStore } from "renderer/models";
import { useTimelineConfig } from "../../../TimelineContext/TimelineContext";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
  field: Instance<typeof Field>;
  position: number;
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
        y={position * config.rowHeight}
        height={config.rowHeight}
        width={config.labelsWidth}
        onMouseOver={handleMouseOverGroup}
        onMouseOut={handleMouseOutGroup}
        onClick={handleClickGroup}
      >
        <Rect
          width={config.labelsWidth}
          height={config.rowHeight}
          fill={
            field.selected
              ? config.selectionColor
              : field.hovered
              ? config.hoverColor
              : config.deselectionColor
          }
        />
        <Text
          x={15}
          y={config.rowHeight / 2 - 8}
          text={field.definition.name}
          fill={config.foregroundColor}
          width={config.labelsWidth - 15}
          fontStyle={field.selected ? "bold" : "normal"}
          ellipsis
          wrap="none"
        />
      </Group>
    );
  }
);
