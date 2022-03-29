import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Item, WorkspaceStore } from "renderer/models";
import { FieldRow } from "./FieldRow/FieldRow";
import { ItemRow } from "./ItemRow/ItemRow";

type Props = {
  item: Instance<typeof Item>;
  workspaceStore: Instance<typeof WorkspaceStore>;
  position: number;
};

export const ItemCollapsible = observer(
  ({ item, workspaceStore, position }: Props): ReactElement => {
    return (
      <>
        <ItemRow
          item={item}
          workspaceStore={workspaceStore}
          position={position}
        />
        {item.toggled &&
          item.fields.map((field, index) => (
            <FieldRow
              key={field.id}
              field={field}
              position={position + index + 1}
            />
          ))}
      </>
    );
  }
);
