import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { PlusIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { MouseEvent as ReactMouseEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { DndDraggable, DndDroppable, DragIndicator } from "renderer/components";
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

    const handlePlusClick = (
      event: ReactMouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      event.stopPropagation();
      const field = itemDefinition.addNewField(t("defaultFieldName"));
      onFieldClick(field.id);
    };

    const handleFieldClick = (fieldId: string) => () => {
      onFieldClick(fieldId);
      onItemClick();
    };

    return (
      <Card clickable onClick={onItemClick} css={{ position: "relative" }}>
        <DragIndicator />
        <Container gap={0}>
          <Row align="center" justify="space-between">
            <Col>
              <Text>{itemDefinition.name}</Text>
              {itemDefinition.description ? (
                <Text small>{itemDefinition.description}</Text>
              ) : (
                <Text small color="$accents6">
                  {t("descriptionPlaceholder")}
                </Text>
              )}
            </Col>
            <Spacer x={0.5} />
            <Button auto onClick={handlePlusClick} icon={<PlusIcon />}>
              {t("addNewField")}
            </Button>
          </Row>
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
