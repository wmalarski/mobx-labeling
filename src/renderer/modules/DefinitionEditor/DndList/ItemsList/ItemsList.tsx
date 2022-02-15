import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { DndDraggable, DndDroppable } from "renderer/components";
import { ProjectDefinition } from "renderer/models/definition";
import { ItemsListItem } from "./ItemsListItem/ItemsListItem";

type Props = {
  projectDefinition: Instance<typeof ProjectDefinition>;
  onItemClick: (itemId: string) => void;
  onFieldClick: (fieldId: string) => void;
};

export const ItemList = observer(
  ({ projectDefinition, onItemClick, onFieldClick }: Props): ReactElement => {
    const handleItemClick = (itemId: string) => () => {
      onItemClick(itemId);
    };

    return (
      <DndDroppable droppableId={projectDefinition.id} type="ITEM">
        {projectDefinition.items.map((itemDefinition, index) => (
          <DndDraggable
            key={itemDefinition.id}
            draggableId={itemDefinition.id}
            index={index}
          >
            <ItemsListItem
              itemDefinition={itemDefinition}
              onFieldClick={onFieldClick}
              onItemClick={handleItemClick(itemDefinition.id)}
            />
          </DndDraggable>
        ))}
      </DndDroppable>
    );
  }
);
