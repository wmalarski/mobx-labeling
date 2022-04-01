import Konva from "konva";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement, useEffect, useRef } from "react";
import { Group, Rect } from "react-konva";
import { Item, WorkspaceStore } from "renderer/models";
import { useTimelineConfig } from "../../TimelineContext/TimelineContext";
import { FieldRow } from "./FieldRow/FieldRow";
import { ItemRow } from "./ItemRow/ItemRow";

type Props = {
  item: Instance<typeof Item>;
  workspaceStore: Instance<typeof WorkspaceStore>;
  position: number;
};

export const ItemCollapsible = observer(
  ({ item, position, workspaceStore }: Props): ReactElement => {
    const config = useTimelineConfig();

    const initialHeight = useRef(position * config.rowHeight);
    const groupRef = useRef<Konva.Group>(null);
    const fillerRef = useRef<Konva.Rect>(null);

    useEffect(() => {
      const shift = item.toggled ? item.fields.length * config.rowHeight : 0;
      fillerRef.current?.to({ y: config.rowHeight + shift });
      groupRef.current?.to({ y: position * config.rowHeight });
    }, [item.fields.length, item.toggled, position, config.rowHeight]);

    return (
      <Group ref={groupRef} x={0} y={initialHeight.current}>
        {item.fields.map((field, index) => (
          <FieldRow
            key={field.id}
            field={field}
            position={index + 1}
            workspaceStore={workspaceStore}
          />
        ))}
        <Rect
          ref={fillerRef}
          y={config.rowHeight}
          width={workspaceStore.framesCount}
          height={item.fields.length * config.rowHeight}
          fill={config.backgroundColor}
        />
        <ItemRow item={item} workspaceStore={workspaceStore} />
      </Group>
    );
  }
);
