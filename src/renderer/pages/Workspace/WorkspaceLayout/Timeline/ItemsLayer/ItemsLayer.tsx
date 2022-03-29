import { useObserver } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Layer, Rect } from "react-konva";
import { WorkspaceStore } from "renderer/models";
import { useTimelineConfig } from "../Timeline.utils";
import { getItemPositions } from "./ItemsLayer.utils";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
  stageX: number;
  scaleX: number;
};

export const ItemsLayer = ({
  workspaceStore,
  stageX,
  scaleX,
}: Props): ReactElement => {
  const { labelsWidth } = useTimelineConfig();

  const items = getItemPositions(workspaceStore);

  return useObserver(() => (
    <Layer x={labelsWidth + stageX} scaleX={scaleX}>
      {items.map(({ item, position }) => (
        // <ItemCollapsible
        //   key={item.id}
        //   item={item}
        //   position={position}
        //   workspaceStore={workspaceStore}
        // />
        <Rect
          x={0}
          y={position * 40}
          key={item.id}
          width={40}
          height={40}
          fill="red"
        />
      ))}
    </Layer>
  ));
};
