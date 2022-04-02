import Konva from "konva";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement, useEffect, useRef } from "react";
import { Group } from "react-konva";
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
    const config = useTimelineConfig();

    const initialHeight = useRef(position * config.rowHeight);
    const groupRef = useRef<Konva.Group>(null);

    useEffect(() => {
      groupRef.current?.to({ y: position * config.rowHeight });
    }, [item.fields.length, item.toggled, position, config.rowHeight]);

    return (
      <Group ref={groupRef} y={initialHeight.current}>
        {item.fields.map((field, index) => (
          <FieldLabel
            key={field.id}
            field={field}
            position={index + 1}
            workspaceStore={workspaceStore}
          />
        ))}
        <ItemLabel item={item} workspaceStore={workspaceStore} />
      </Group>
    );
  }
);
