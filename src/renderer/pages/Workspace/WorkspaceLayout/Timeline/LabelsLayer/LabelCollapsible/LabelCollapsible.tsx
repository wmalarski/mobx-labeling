import Konva from "konva";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement, useEffect, useRef } from "react";
import { Group, Rect } from "react-konva";
import { Item, WorkspaceStore } from "renderer/models";
import { useTimelineConfig } from "../../TimelineContext/TimelineContext";
import { FieldLabel } from "./FieldLabel/FieldLabel";
import { ItemLabel } from "./ItemLabel/ItemLabel";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
  item: Instance<typeof Item>;
  position: number;
};

export const LabelCollapsible = observer(
  ({ item, position, workspaceStore }: Props): ReactElement => {
    const { labelsWidth, rowHeight, backgroundColor } = useTimelineConfig();

    const initialHeight = useRef(position * rowHeight);
    const groupRef = useRef<Konva.Group>(null);
    const fillerRef = useRef<Konva.Rect>(null);

    useEffect(() => {
      const shift = item.toggled ? item.fields.length * rowHeight : 0;
      fillerRef.current?.to({ y: rowHeight + shift });
      groupRef.current?.to({ y: position * rowHeight });
    }, [item.fields.length, item.toggled, position, rowHeight]);

    return (
      <Group ref={groupRef} x={0} y={initialHeight.current} width={labelsWidth}>
        {item.fields.map((field, index) => (
          <FieldLabel
            key={field.id}
            field={field}
            position={index + 1}
            workspaceStore={workspaceStore}
          />
        ))}
        <Rect
          ref={fillerRef}
          y={rowHeight}
          width={labelsWidth}
          height={item.fields.length * rowHeight}
          fill={backgroundColor}
        />
        <ItemLabel item={item} workspaceStore={workspaceStore} />
      </Group>
    );
  }
);
