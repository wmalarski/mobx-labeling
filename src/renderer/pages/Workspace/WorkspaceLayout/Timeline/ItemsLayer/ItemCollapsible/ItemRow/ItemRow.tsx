import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Rect } from "react-konva";
import { Item, WorkspaceStore } from "renderer/models";

type Props = {
  item: Instance<typeof Item>;
  workspaceStore: Instance<typeof WorkspaceStore>;
  position: number;
};

export const ItemRow = observer(
  ({ item, workspaceStore, position }: Props): ReactElement => {
    const { t } = useTranslation("common");
    return (
      <Rect
        key={block.from}
        x={block.from}
        y={row * rowHeight}
        width={block.to + 1 - block.from}
        height={rowHeight - 3}
        fill={isSelected ? selectionColor : deselectionColor}
      />
    );
  }
);
