import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Layer } from "react-konva";
import { WorkspaceStore } from "renderer/models";
import { getItemPositions } from "../Timeline.utils";
import { useTimelineConfig } from "../TimelineContext/TimelineContext";
import { LabelCollapsible } from "./LabelCollapsible/LabelCollapsible";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
};

export const LabelsLayer = observer(
  ({ workspaceStore }: Props): ReactElement => {
    const { labelsWidth } = useTimelineConfig();

    const items = getItemPositions(workspaceStore);

    return (
      <Layer x={0} y={0} width={labelsWidth}>
        {items.map(({ item, position }) => (
          <LabelCollapsible
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
