import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ProjectDefinition } from "renderer/models/definition";
import * as Styles from "./ItemsList.styles";
import { ItemsListItem } from "./ItemsListItem/ItemsListItem";

type Props = {
  projectDefinition: Instance<typeof ProjectDefinition>;
};

export const ItemList = observer(
  ({ projectDefinition }: Props): ReactElement => {
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
                    <ItemsListItem itemDefinition={itemDefinition} />
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
