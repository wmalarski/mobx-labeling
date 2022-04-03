import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Group, Layer } from "react-konva";
import { WorkspaceStore } from "renderer/models";
import { ItemPosition } from "../Timeline.utils";
import { useTimelineConfig } from "../TimelineContext/TimelineContext";
import { FieldLabel } from "./FieldLabel/FieldLabel";
import { ItemLabel } from "./ItemLabel/ItemLabel";

type Props = {
  items: ItemPosition[];
  workspaceStore: Instance<typeof WorkspaceStore>;
};

export const LabelsLayer = observer(
  ({ workspaceStore, items }: Props): ReactElement => {
    const config = useTimelineConfig();

    return (
      <Layer>
        {items.map(({ item, position }) => (
          <Group key={item.id} y={position * config.rowHeight}>
            {item.fields.map((field, index) => (
              <FieldLabel
                field={field}
                key={field.id}
                position={index + 1}
                workspaceStore={workspaceStore}
              />
            ))}
            <ItemLabel item={item} workspaceStore={workspaceStore} />
          </Group>
        ))}
      </Layer>
    );
  }
);
