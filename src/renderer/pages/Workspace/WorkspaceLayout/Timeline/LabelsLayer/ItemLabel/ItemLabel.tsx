import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement, useEffect, useRef } from "react";
import { Group, Rect, Text } from "react-konva";
import { Item, WorkspaceStore } from "renderer/models";
import { useTimelineConfig } from "../../TimelineContext/TimelineContext";
import { FieldLabel } from "./FieldLabel/FieldLabel";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
  item: Instance<typeof Item>;
  position: number;
};

export const ItemLabel = observer(
  ({ item, position, workspaceStore }: Props): ReactElement => {
    const {
      labelsWidth,
      rowHeight,
      backgroundColor,
      deselectionColor,
      selectionColor,
      hoverColor,
      foregroundColor,
    } = useTimelineConfig();

    const initialHeight = useRef(position * rowHeight);
    const groupRef = useRef<Konva.Group>(null);
    const fieldsRef = useRef<Konva.Group>(null);
    const rectRef = useRef<Konva.Rect>(null);
    const arrowRef = useRef<Konva.Text>(null);
    const fillerRef = useRef<Konva.Rect>(null);

    const handleMouseOverGroup = () => {
      rectRef.current?.fill(item.selected ? selectionColor : hoverColor);
    };

    const handleMouseOutGroup = () => {
      rectRef.current?.fill(item.selected ? selectionColor : deselectionColor);
    };

    const handleClickArrow = (event: KonvaEventObject<MouseEvent>) => {
      event.cancelBubble = true;

      item.setToggled(!item.toggled);
      arrowRef.current?.to({
        rotation: item.toggled ? 180 : 0,
      });
      fillerRef.current?.to({
        y: rowHeight + (item.toggled ? item.fields.length * rowHeight : 0),
      });
    };

    const handleClickGroup = () => {
      item.setSelected(!item.selected);
    };

    useEffect(() => {
      groupRef.current?.to({
        y: position * rowHeight,
      });
    }, [position, rowHeight]);

    return (
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
          fill={backgroundColor}
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
            fill={item.selected ? selectionColor : deselectionColor}
          />
          <Text
            ref={arrowRef}
            text="▼"
            x={5}
            y={rowHeight / 2}
            offsetX={6}
            offsetY={5}
            fill={foregroundColor}
          />
          <Rect
            x={0}
            y={0}
            width={15}
            height={rowHeight}
            onClick={handleClickArrow}
          />
          <Text
            x={15}
            y={rowHeight / 2 - 8}
            text={item.name}
            fill={foregroundColor}
            width={labelsWidth - 15}
            ellipsis
            wrap="none"
          />
        </Group>
      </Group>
    );
  }
);
