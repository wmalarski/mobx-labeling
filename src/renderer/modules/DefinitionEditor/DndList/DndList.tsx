import { Container, Row, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement, useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { DndDraggable, DndDroppable } from "renderer/components";
import { DefinitionNodeKind, ProjectDefinition } from "renderer/models";
import { ItemsListItem } from "./ItemsListItem/ItemsListItem";

type Props = {
  projectDefinition: Instance<typeof ProjectDefinition>;
  onSelectedItemChange: (itemId: string) => void;
  onSelectedFieldChange: (fieldId: string) => void;
};

export const DndList = observer(
  ({
    projectDefinition,
    onSelectedFieldChange,
    onSelectedItemChange,
  }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const onDragEnd = useCallback(
      (result: DropResult) => {
        projectDefinition.reorder(result);
      },
      [projectDefinition]
    );

    const handleItemClick = (itemId: string) => () => {
      onSelectedItemChange(itemId);
    };

    return (
      <Container gap={0}>
        <Row align="center" justify="space-between">
          <Text h3>{t("definitionItems")}</Text>
        </Row>
        <Row>
          <DragDropContext onDragEnd={onDragEnd}>
            <DndDroppable
              droppableId={projectDefinition.id}
              type={DefinitionNodeKind.Item}
            >
              {projectDefinition.items.map((itemDefinition, index) => (
                <DndDraggable
                  key={itemDefinition.id}
                  draggableId={itemDefinition.id}
                  index={index}
                >
                  <ItemsListItem
                    itemDefinition={itemDefinition}
                    onFieldClick={onSelectedFieldChange}
                    onItemClick={handleItemClick(itemDefinition.id)}
                  />
                </DndDraggable>
              ))}
            </DndDroppable>
          </DragDropContext>
        </Row>
      </Container>
    );
  }
);
