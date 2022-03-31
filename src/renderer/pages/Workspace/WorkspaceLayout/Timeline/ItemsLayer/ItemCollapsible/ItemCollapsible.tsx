import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Rect } from "react-konva";
import { Item, WorkspaceStore } from "renderer/models";

type Props = {
  item: Instance<typeof Item>;
  workspaceStore: Instance<typeof WorkspaceStore>;
  position: number;
};

export const ItemCollapsible = ({ item, position }: Props): ReactElement => {
  return (
    <Rect
      x={0}
      y={position * 40}
      key={item.id}
      width={40}
      height={40}
      fill="red"
    />
    // <>
    //   <ItemRow
    //     item={item}
    //     workspaceStore={workspaceStore}
    //     position={position}
    //   />
    //   {item.toggled &&
    //     item.fields.map((field, index) => (
    //       <FieldRow
    //         key={field.id}
    //         field={field}
    //         position={position + index + 1}
    //       />
    //     ))}
    // </>
  );
};
