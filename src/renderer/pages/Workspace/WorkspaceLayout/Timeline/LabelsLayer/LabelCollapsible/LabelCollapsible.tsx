import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
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

    return (
      <Group y={position * config.rowHeight}>
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
