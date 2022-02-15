import { styled } from "@nextui-org/react";

const scrollContainerHeight = 250;

export const ListWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: "10px",
  border: "10px",
  paddingBottom: 0,
  transition: "background-color 0.2s ease, opacity 0.1s ease",
  userSelect: "none",
  width: "250px",
});

export const DropZone = styled("div", {
  /* stop the list collapsing when empty */
  minHeight: `${scrollContainerHeight}px`,
  /*
    not relying on the items for a margin-bottom
    as it will collapse when the list is empty
  */
  paddingBottom: "10px",
});

export const ItemWrapper = styled("div", {});
