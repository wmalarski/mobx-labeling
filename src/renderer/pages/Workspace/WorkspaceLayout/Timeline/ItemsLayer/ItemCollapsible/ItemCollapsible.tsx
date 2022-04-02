import Konva from "konva";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement, useEffect, useRef } from "react";
import { Group } from "react-konva";
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

    useEffect(() => {
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
        <ItemRow item={item} workspaceStore={workspaceStore} />
      </Group>
    );
  }
);
