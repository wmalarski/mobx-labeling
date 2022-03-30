import { useTheme } from "@geist-ui/core";
import Konva from "konva";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement, useEffect, useRef } from "react";
import { Group, Rect, Text } from "react-konva";
import { Item, WorkspaceStore } from "renderer/models";
import { useTimelineConfig } from "../../Timeline.utils";
import { FieldLabel } from "./FieldLabel/FieldLabel";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
  item: Instance<typeof Item>;
  position: number;
};

export const ItemLabel = observer(
  ({ item, position, workspaceStore }: Props): ReactElement => {
    const theme = useTheme();
    const { labelsWidth, rowHeight } = useTimelineConfig();

    const groupRef = useRef<Konva.Group>(null);
    const fieldsRef = useRef<Konva.Group>(null);
    const rectRef = useRef<Konva.Rect>(null);
    const arrowRef = useRef<Konva.Text>(null);
    const fillerRef = useRef<Konva.Rect>(null);

    const handleMouseOverGroup = () => {
      rectRef.current?.fill("blue");
    };

    const handleMouseOutGroup = () => {
      rectRef.current?.fill("yellow");
    };

    const handleClickGroup = () => {
      item.setToggled(!item.toggled);
      arrowRef.current?.to({
        rotation: item.toggled ? 180 : 0,
      });
      fillerRef.current?.to({
        y: rowHeight + (item.toggled ? item.fields.length * rowHeight : 0),
      });
    };

    useEffect(() => {
      groupRef.current?.to({
        y: position * rowHeight,
      });
    }, [position, rowHeight]);

    const initialHeight = useRef(position * rowHeight);

    return (
      <>
        <Group
          ref={groupRef}
          x={0}
          y={initialHeight.current}
          height={rowHeight}
          width={labelsWidth}
        >
          <Group ref={fieldsRef}>
            {item.fields.map((field, index) => (
              <FieldLabel
                key={field.id}
                field={field}
                position={index + 1}
                workspaceStore={workspaceStore}
              />
            ))}
          </Group>
          <Rect
            ref={fillerRef}
            y={rowHeight}
            width={labelsWidth}
            height={item.fields.length * rowHeight}
            fill="white"
          />
          <Group
            onMouseOver={handleMouseOverGroup}
            onMouseOut={handleMouseOutGroup}
            onClick={handleClickGroup}
          >
            <Rect
              ref={rectRef}
              width={labelsWidth}
              height={rowHeight}
              fill="yellow"
            />
            <Text ref={arrowRef} text="▼" x={5} y={5} offsetX={6} offsetY={5} />
            <Text
              x={12}
              text={item.name}
              fill={theme.palette.foreground}
              align="center"
              verticalAlign="center"
            />
          </Group>
        </Group>
      </>
    );
  }
);
