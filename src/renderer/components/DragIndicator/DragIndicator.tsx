import { styled } from "@nextui-org/react";
import { DragHandleVerticalIcon } from "@radix-ui/react-icons";

export const DragIndicator = styled(DragHandleVerticalIcon, {
  position: "absolute",
  top: "calc(50% - 8px)",
  left: "2px",
});
