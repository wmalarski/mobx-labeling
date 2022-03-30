import { useTheme } from "@geist-ui/core";
import Konva from "konva";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement, useRef } from "react";
import { Group, Rect, Text } from "react-konva";
import { Field, WorkspaceStore } from "renderer/models";
import { useTimelineConfig } from "../../../Timeline.utils";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
  field: Instance<typeof Field>;
  position: number;
};

export const FieldLabel = observer(
  ({ field, position }: Props): ReactElement => {
    const theme = useTheme();
    const { labelsWidth, rowHeight } = useTimelineConfig();

    const rectRef = useRef<Konva.Rect>(null);

    const handleMouseOverGroup = () => {
      rectRef.current?.fill("blue");
    };

    const handleMouseOutGroup = () => {
      rectRef.current?.fill("yellow");
    };

    return (
      <Group
        x={0}
        y={position * rowHeight}
        height={rowHeight}
        width={labelsWidth}
        onMouseOver={handleMouseOverGroup}
        onMouseOut={handleMouseOutGroup}
      >
        <Rect
          ref={rectRef}
          width={labelsWidth}
          height={rowHeight}
          fill="yellow"
        />
        <Text
          x={12}
          text={field.definition.name}
          fill={theme.palette.foreground}
          align="center"
          verticalAlign="center"
        />
      </Group>
    );
  }
);
