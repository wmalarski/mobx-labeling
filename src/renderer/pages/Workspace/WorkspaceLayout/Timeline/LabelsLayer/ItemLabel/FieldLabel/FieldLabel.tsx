import Konva from "konva";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement, useRef } from "react";
import { Group, Rect, Text } from "react-konva";
import { Field, WorkspaceStore } from "renderer/models";
import { useTimelineConfig } from "../../../TimelineContext/TimelineContext";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
  field: Instance<typeof Field>;
  position: number;
};

export const FieldLabel = observer(
  ({ field, position }: Props): ReactElement => {
    const {
      labelsWidth,
      rowHeight,
      foregroundColor,
      selectionColor,
      hoverColor,
      deselectionColor,
    } = useTimelineConfig();

    const rectRef = useRef<Konva.Rect>(null);

    const handleMouseOverGroup = () => {
      rectRef.current?.fill(field.selected ? selectionColor : hoverColor);
    };

    const handleMouseOutGroup = () => {
      rectRef.current?.fill(field.selected ? selectionColor : deselectionColor);
    };

    const handleClickGroup = () => {
      field.setSelected(!field.selected);
    };

    return (
      <Group
        x={0}
        y={position * rowHeight}
        height={rowHeight}
        width={labelsWidth}
        onMouseOver={handleMouseOverGroup}
        onMouseOut={handleMouseOutGroup}
        onClick={handleClickGroup}
      >
        <Rect
          ref={rectRef}
          width={labelsWidth}
          height={rowHeight}
          fill={field.selected ? selectionColor : deselectionColor}
        />
        <Text
          x={15}
          y={rowHeight / 2 - 8}
          text={field.definition.name}
          fill={foregroundColor}
          width={labelsWidth - 15}
          ellipsis
          wrap="none"
        />
      </Group>
    );
  }
);
