import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Layer } from "react-konva";
import { WorkspaceStore } from "renderer/models";
import { getItemPositions } from "../Timeline.utils";
import { useTimelineConfig } from "../TimelineContext/TimelineContext";
import { ItemCollapsible } from "./ItemCollapsible/ItemCollapsible";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
  stageX: number;
  scaleX: number;
};

export const ItemsLayer = observer(
  ({ workspaceStore, stageX, scaleX }: Props): ReactElement => {
    const { labelsWidth } = useTimelineConfig();

    const items = getItemPositions(workspaceStore);

    return (
      <Layer x={labelsWidth + stageX} scaleX={scaleX}>
        {items.map(({ item, position }) => (
          <ItemCollapsible
            key={item.id}
            item={item}
            position={position}
            workspaceStore={workspaceStore}
          />
        ))}
      </Layer>
    );
  }
);
