import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Group, Layer } from "react-konva";
import { WorkspaceStore } from "renderer/models";
import { ItemPosition, UseXZoomResult } from "../Timeline.utils";
import { useTimelineConfig } from "../TimelineContext/TimelineContext";
import { FieldRow } from "./FieldRow/FieldRow";
import { ItemRow } from "./ItemRow/ItemRow";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
  zoom: UseXZoomResult;
  items: ItemPosition[];
};

export const ItemsLayer = observer(
  ({ workspaceStore, zoom, items }: Props): ReactElement => {
    const config = useTimelineConfig();

    const dragBoundFunc = (pos: Konva.Vector2d): Konva.Vector2d => {
      return { y: 0, x: pos.x };
    };

    const handleDragEnd = (event: KonvaEventObject<DragEvent>) => {
      const x = event.target.x() - config.labelsWidth;
      zoom.dispatch({ type: "move", x });
    };

    return (
      <Layer
        x={config.labelsWidth + zoom.stageX}
        scaleX={zoom.scaleX}
        draggable
        dragBoundFunc={dragBoundFunc}
        onDragEnd={handleDragEnd}
      >
        {items.map(({ item, position }) => (
          <Group key={item.id} y={position * config.rowHeight}>
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
        ))}
      </Layer>
    );
  }
);
