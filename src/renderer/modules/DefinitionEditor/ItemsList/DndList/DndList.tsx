import { styled } from "@nextui-org/react";
import { Component } from "react";
import {
  DragDropContext,
  DraggableLocation,
  Droppable,
  DroppableProvided,
  DropResult,
} from "react-beautiful-dnd";
import reorder, { reorderQuoteMap } from "../reorder";
import Column from "./Column/Column";
import { Quote, QuoteMap } from "./DndList.types";

const ParentContainer = styled("div", {
  overflowX: "hidden",
  overflowY: "auto",
});

const Container = styled("div", {
  backgroundColor: "red",
  minHeight: "100vh",
  /* like display:flex but will allow bleeding over the window width */
  minWidth: "100vw",
  display: "inline-flex",
});

type Props = {
  initial: QuoteMap;
  withScrollableColumns?: boolean;
  isCombineEnabled?: boolean;
  containerHeight?: string;
  useClone?: boolean;
};

type State = {
  columns: QuoteMap;
  ordered: string[];
};

export default class Board extends Component<Props, State> {
  /* eslint-disable react/sort-comp */
  static defaultProps = {
    isCombineEnabled: false,
  };

  state: State = {
    columns: this.props.initial,
    ordered: Object.keys(this.props.initial),
  };

  boardRef: HTMLElement;

  onDragEnd = (result: DropResult) => {
    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow: string[] = [...this.state.ordered];
        shallow.splice(result.source.index, 1);
        this.setState({ ordered: shallow });
        return;
      }

      const column: Quote[] = this.state.columns[result.source.droppableId];
      const withQuoteRemoved: Quote[] = [...column];
      withQuoteRemoved.splice(result.source.index, 1);
      const columns: QuoteMap = {
        ...this.state.columns,
        [result.source.droppableId]: withQuoteRemoved,
      };
      this.setState({ columns });
      return;
    }

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source: DraggableLocation = result.source;
    const destination: DraggableLocation = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === "COLUMN") {
      const ordered: string[] = reorder(
        this.state.ordered,
        source.index,
        destination.index
      );

      this.setState({
        ordered,
      });

      return;
    }

    const data = reorderQuoteMap({
      quoteMap: this.state.columns,
      source,
      destination,
    });

    this.setState({
      columns: data.quoteMap,
    });
  };

  render() {
    const columns: QuoteMap = this.state.columns;
    const ordered: string[] = this.state.ordered;
    const {
      containerHeight,
      useClone,
      isCombineEnabled,
      withScrollableColumns,
    } = this.props;

    const board = (
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        ignoreContainerClipping={Boolean(containerHeight)}
        isCombineEnabled={isCombineEnabled}
      >
        {(provided: DroppableProvided) => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {ordered.map((key: string, index: number) => (
              <Column
                key={key}
                index={index}
                title={key}
                quotes={columns[key]}
                isScrollable={withScrollableColumns}
                isCombineEnabled={isCombineEnabled}
                useClone={useClone}
              />
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    );

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {containerHeight ? (
          <ParentContainer css={{ height: containerHeight }}>
            {board}
          </ParentContainer>
        ) : (
          board
        )}
      </DragDropContext>
    );
  }
}
