import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ProjectDefinition } from "renderer/models/definition";
import * as Styles from "./ItemsList.styles";
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
      <Droppable droppableId={projectDefinition.id} type="ITEM">
        {(provided) => (
          <Styles.ListWrapper
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {projectDefinition.items.map((itemDefinition, index) => (
              <Draggable
                key={itemDefinition.id}
                draggableId={itemDefinition.id}
                index={index}
              >
                {(dragProvided) => (
                  <Styles.ItemWrapper
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                    style={dragProvided.draggableProps.style}
                  >
                    <ItemsListItem
                      itemDefinition={itemDefinition}
                      onFieldClick={onFieldClick}
                      onItemClick={handleItemClick(itemDefinition.id)}
                    />
                  </Styles.ItemWrapper>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Styles.ListWrapper>
        )}
      </Droppable>
    );
  }
);
