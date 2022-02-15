import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ItemDefinition } from "renderer/models/definition";
import * as Styles from "./FieldList.styles";
import { FieldListItem } from "./FieldListItem/FieldListItem";

type Props = {
  itemDefinition: Instance<typeof ItemDefinition>;
  onFieldClick: (fieldId: string) => void;
};

export const FieldList = observer(
  ({ itemDefinition, onFieldClick }: Props): ReactElement => {
    const handleFieldClick = (fieldId: string) => () => {
      onFieldClick(fieldId);
    };

    return (
      <Droppable droppableId={itemDefinition.id} type="FIELD">
        {(dropProvided) => (
          <Styles.ListWrapper
            ref={dropProvided.innerRef}
            {...dropProvided.droppableProps}
          >
            {itemDefinition.fields.map((fieldDefinition, index) => (
              <Draggable
                key={fieldDefinition.id}
                draggableId={fieldDefinition.id}
                index={index}
              >
                {(dragProvided, dragSnapshot) => (
                  <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                    style={dragProvided.draggableProps.style}
                  >
                    <FieldListItem
                      fieldDefinition={fieldDefinition}
                      stateSnapshot={dragSnapshot}
                      onClick={handleFieldClick(fieldDefinition.id)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {dropProvided.placeholder}
          </Styles.ListWrapper>
        )}
      </Droppable>
    );
  }
);
