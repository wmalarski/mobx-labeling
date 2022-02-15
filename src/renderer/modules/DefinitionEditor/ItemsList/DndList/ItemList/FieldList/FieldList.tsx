import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ItemDefinition } from "renderer/models/definition";
import * as Styles from "./FieldList.styles";
import { FieldListItem } from "./FieldListItem/FieldListItem";

type Props = {
  listId?: string;
  listType?: string;
  itemDefinition: Instance<typeof ItemDefinition>;
};

export const FieldList = observer(
  ({ listId = "LIST", listType, itemDefinition }: Props): ReactElement => {
    return (
      <Droppable droppableId={listId} type={listType}>
        {(dropProvided) => (
          <Styles.ListWrapper {...dropProvided.droppableProps}>
            <Styles.DropZone ref={dropProvided.innerRef}>
              {itemDefinition.fields.map((fieldDefinition, index: number) => (
                <Draggable
                  key={fieldDefinition.id}
                  draggableId={fieldDefinition.id}
                  index={index}
                >
                  {(dragProvided, dragSnapshot) => (
                    <Styles.ItemWrapper
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                      style={dragProvided.draggableProps.style}
                    >
                      <FieldListItem
                        fieldDefinition={fieldDefinition}
                        stateSnapshot={dragSnapshot}
                      />
                    </Styles.ItemWrapper>
                  )}
                </Draggable>
              ))}
              {dropProvided.placeholder}
            </Styles.DropZone>
          </Styles.ListWrapper>
        )}
      </Droppable>
    );
  }
);
