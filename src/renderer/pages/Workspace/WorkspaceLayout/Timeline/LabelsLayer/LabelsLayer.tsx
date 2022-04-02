import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Layer } from "react-konva";
import { WorkspaceStore } from "renderer/models";
import { ItemPosition } from "../Timeline.utils";
import { LabelCollapsible } from "./LabelCollapsible/LabelCollapsible";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
  items: ItemPosition[];
};

export const LabelsLayer = observer(
  ({ workspaceStore, items }: Props): ReactElement => {
    return (
      <Layer>
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
