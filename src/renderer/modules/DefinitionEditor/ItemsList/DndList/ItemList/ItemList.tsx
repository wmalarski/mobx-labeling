import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ProjectDefinition } from "renderer/models/definition";
import { FieldList } from "./FieldList/FieldList";
import * as Styles from "./ItemList.styles";

type Props = {
  projectDefinition: Instance<typeof ProjectDefinition>;
};

export const ItemList = observer(
  ({ projectDefinition }: Props): ReactElement => {
    return (
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
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
                    <FieldList
                      listId={itemDefinition.id}
                      listType="QUOTE"
                      itemDefinition={itemDefinition}
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
