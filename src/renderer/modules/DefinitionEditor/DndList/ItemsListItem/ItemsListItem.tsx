import { Card, Container, Text } from "@nextui-org/react";
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
        clickable
        onClick={onItemClick}
        css={{ position: "relative", width: "100%" }}
      >
        <Container gap={0}>
          <Text>{itemDefinition.name}</Text>
          {itemDefinition.description ? (
            <Text small>{itemDefinition.description}</Text>
          ) : (
            <Text small color="$accents6">
              {t("descriptionPlaceholder")}
            </Text>
          )}
        </Container>
        <DndDroppable
          droppableId={itemDefinition.id}
          type={DefinitionNodeKind.Field}
        >
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
      </Card>
    );
  }
);