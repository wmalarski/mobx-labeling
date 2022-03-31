import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Group, Rect } from "react-konva";
import { Item, WorkspaceStore } from "renderer/models";
import { useTimelineConfig } from "../../../TimelineContext/TimelineContext";

type Props = {
  item: Instance<typeof Item>;
  workspaceStore: Instance<typeof WorkspaceStore>;
};

export const ItemRow = observer(
  ({ item, workspaceStore }: Props): ReactElement => {
    const { rowHeight, deselectionColor, selectionColor } = useTimelineConfig();

    return (
      <Group>
        <Rect
          width={workspaceStore.framesCount}
          height={rowHeight}
          fill={item.selected ? selectionColor : deselectionColor}
        />
      </Group>
    );
  }
);
