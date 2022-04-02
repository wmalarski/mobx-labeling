import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
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

    return (
      <Group y={position * config.rowHeight}>
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
