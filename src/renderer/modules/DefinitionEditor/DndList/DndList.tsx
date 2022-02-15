import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { ProjectDefinition } from "renderer/models/definition";
import { ItemList } from "./ItemsList/ItemsList";

type Props = {
  projectDefinition: Instance<typeof ProjectDefinition>;
};

export const DndList = ({ projectDefinition }: Props): ReactElement => {
  const onDragEnd = (result: DropResult) => {
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
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ItemList projectDefinition={projectDefinition} />
    </DragDropContext>
  );
};
