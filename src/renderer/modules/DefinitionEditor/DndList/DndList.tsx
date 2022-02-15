import { Button, Container, Row, Spacer, Text } from "@nextui-org/react";
import { Instance } from "mobx-state-tree";
import { ReactElement, useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { DndDraggable, DndDroppable } from "renderer/components";
import { ProjectDefinition } from "renderer/models/definition";
import { ItemsListItem } from "./ItemsListItem/ItemsListItem";

type Props = {
  projectDefinition: Instance<typeof ProjectDefinition>;
  onSelectedItemChange: (itemId: string) => void;
  onSelectedFieldChange: (fieldId: string) => void;
};

export const DndList = ({
  projectDefinition,
  onSelectedFieldChange,
  onSelectedItemChange,
}: Props): ReactElement => {
  const { t } = useTranslation("definition");

  const onDragEnd = useCallback((result: DropResult) => {
    console.log(result);
    // if (result.combine) {
    //   if (result.type === "COLUMN") {
    //     const shallow: string[] = [...this.state.ordered];
    //     shallow.splice(result.source.index, 1);
    //     this.setState({ ordered: shallow });
    //     return;
    //   }

    //   const column: Quote[] = this.state.columns[result.source.droppableId];
    //   const withQuoteRemoved: Quote[] = [...column];
    //   withQuoteRemoved.splice(result.source.index, 1);
    //   const columns: QuoteMap = {
    //     ...this.state.columns,
    //     [result.source.droppableId]: withQuoteRemoved,
    //   };
    //   this.setState({ columns });
    //   return;
    // }

    // // dropped nowhere
    // if (!result.destination) {
    //   return;
    // }

    // const source: DraggableLocation = result.source;
    // const destination: DraggableLocation = result.destination;

    // // did not move anywhere - can bail early
    // if (
    //   source.droppableId === destination.droppableId &&
    //   source.index === destination.index
    // ) {
    //   return;
    // }

    // // reordering column
    // if (result.type === "COLUMN") {
    //   const ordered: string[] = reorder(
    //     this.state.ordered,
    //     source.index,
    //     destination.index
    //   );

    //   this.setState({
    //     ordered,
    //   });

    //   return;
    // }

    // const data = reorderQuoteMap({
    //   quoteMap: this.state.columns,
    //   source,
    //   destination,
    // });

    // this.setState({
    //   columns: data.quoteMap,
    // });
  }, []);

  const handlePlusClick = () => {
    const item = projectDefinition.addNewItem(t("defaultItemName"));
    onSelectedItemChange(item.id);
  };

  const handleItemClick = (itemId: string) => () => {
    onSelectedItemChange(itemId);
  };

  return (
    <Container gap={0}>
      <Row>
        <Text h2>{t("definitionItems")}</Text>
        <Spacer y={0.5} />
        <Button auto rounded onClick={handlePlusClick}>
          {t("addNewItem")}
        </Button>
      </Row>
      <DragDropContext onDragEnd={onDragEnd}>
        <DndDroppable droppableId={projectDefinition.id} type="ITEM">
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
    </Container>
  );
};
