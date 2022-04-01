import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Layer } from "react-konva";
import { WorkspaceStore } from "renderer/models";
import { getItemPositions } from "../Timeline.utils";
import { LabelCollapsible } from "./LabelCollapsible/LabelCollapsible";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
  width: number;
};

export const LabelsLayer = observer(
  ({ workspaceStore, width }: Props): ReactElement => {
    const items = getItemPositions(workspaceStore);

    return (
      <Layer width={width}>
        {items.map(({ item, position }) => (
          <LabelCollapsible
            key={item.id}
            item={item}
            position={position}
            workspaceStore={workspaceStore}
            width={width}
          />
        ))}
      </Layer>
    );
  }
);
