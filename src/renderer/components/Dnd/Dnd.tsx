import { ReactElement, ReactNode } from "react";
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
} from "react-beautiful-dnd";
import * as Styles from "./Dnd.styles";

type DndDroppableProps = Omit<DroppableProps, "children"> & {
  children: ReactNode;
};

export const DndDroppable = ({
  children,
  ...props
}: DndDroppableProps): ReactElement => {
  return (
    <Droppable {...props}>
      {(provided) => (
        <Styles.ListWrapper
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {children}
          {provided.placeholder}
        </Styles.ListWrapper>
      )}
    </Droppable>
  );
};

type DndDraggableProps = Omit<DraggableProps, "children"> & {
  children: ReactNode;
};

export const DndDraggable = ({
  children,
  ...props
}: DndDraggableProps): ReactElement => {
  return (
    <Draggable {...props}>
      {(provided) => (
        <Styles.ItemWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={provided.draggableProps.style}
        >
          {children}
        </Styles.ItemWrapper>
      )}
    </Draggable>
  );
};
