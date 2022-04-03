import { Card, Divider, Text } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { DndDraggable, DndDroppable } from "renderer/components";
import { DefinitionNodeKind, ItemDefinition } from "renderer/models";
import { FieldListItem } from "./FieldListItem/FieldListItem";

type Props = {
  itemDefinition: Instance<typeof ItemDefinition>;
  onItemClick: () => void;
  onFieldClick: (fieldId: string) => void;
};

export const ItemsListItem = observer(
  ({ itemDefinition, onFieldClick, onItemClick }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handleFieldClick = (fieldId: string) => () => {
      onFieldClick(fieldId);
      onItemClick();
    };

    return (
      <Card
        hoverable
        onClick={onItemClick}
        style={{
          position: "relative",
          width: "100%",
          margin: "5px",
        }}
      >
        <Card.Content>
          <Text>{itemDefinition.name}</Text>
          {itemDefinition.description ? (
            <Text small>{itemDefinition.description}</Text>
          ) : (
            <Text small type="secondary">
              {t("descriptionPlaceholder")}
            </Text>
          )}
        </Card.Content>
        <Divider h="1px" my={0} />
        <Card.Content>
          <DndDroppable
            droppableId={itemDefinition.id}
            type={DefinitionNodeKind.Field}
          >
            {itemDefinition.fields.map((fieldDefinition, index) => (
              <DndDraggable
                draggableId={fieldDefinition.id}
                index={index}
                key={fieldDefinition.id}
              >
                <FieldListItem
                  fieldDefinition={fieldDefinition}
                  onClick={handleFieldClick(fieldDefinition.id)}
                />
              </DndDraggable>
            ))}
          </DndDroppable>
        </Card.Content>
      </Card>
    );
  }
);
