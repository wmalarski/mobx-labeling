import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { DndDraggable, DndDroppable } from "renderer/components";
import { ItemDefinition } from "renderer/models/definition";
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
      <DndDroppable droppableId={itemDefinition.id} type="FIELD">
        {itemDefinition.fields.map((fieldDefinition, index) => (
          <DndDraggable
            key={fieldDefinition.id}
            draggableId={fieldDefinition.id}
            index={index}
          >
            <FieldListItem
              fieldDefinition={fieldDefinition}
              onClick={handleFieldClick(fieldDefinition.id)}
            />
          </DndDraggable>
        ))}
      </DndDroppable>
    );
  }
);
