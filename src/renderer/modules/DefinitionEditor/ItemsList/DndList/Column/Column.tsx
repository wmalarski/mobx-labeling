import { styled } from "@nextui-org/react";
import { Component } from "react";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { Quote } from "../DndList.types";
import QuoteList from "../primatives/quote-list";

const Title = styled("h4", {
  padding: "10px",
  transition: "background-color ease 0.2s",
  flexGrow: 1,
  userSelect: "none",
  position: "relative",
  "&:focus": {
    outline: "2px solid green",
    outlineOffset: "2px",
  },
});

const Container = styled("div", {
  margin: `10px`,
  display: "flex",
  flexDirection: "column",
});

const Header = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderTopLeftRadius: `5px`,
  borderTopRightRadius: `5px`,

  variant: {
    isDragging: {
      true: {
        backgroundColor: "blue",
      },
      false: {
        backgroundColor: "green",
      },
    },
  },

  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: "red",
  },
});

type Props = {
  title: string;
  quotes: Quote[];
  index: number;
  isScrollable?: boolean;
  isCombineEnabled?: boolean;
  useClone?: boolean;
};

export default class Column extends Component<Props> {
  render() {
    const title: string = this.props.title;
    const quotes: Quote[] = this.props.quotes;
    const index: number = this.props.index;
    return (
      <Draggable draggableId={title} index={index}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <Container ref={provided.innerRef} {...provided.draggableProps}>
            <Header isDragging={snapshot.isDragging}>
              <Title
                {...provided.dragHandleProps}
                aria-label={`${title} quote list`}
              >
                {title}
              </Title>
            </Header>
            <QuoteList
              listId={title}
              listType="QUOTE"
              style={{
                backgroundColor: snapshot.isDragging ? "yellow" : null,
              }}
              quotes={quotes}
              internalScroll={this.props.isScrollable}
              isCombineEnabled={Boolean(this.props.isCombineEnabled)}
              useClone={Boolean(this.props.useClone)}
            />
          </Container>
        )}
      </Draggable>
    );
  }
}
