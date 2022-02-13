import { styled } from "@nextui-org/react";

export const Li = styled("li", {
  padding: "$xs $md",
  outline: "none",
  cursor: "pointer",
  color: "$text",
  borderRadius: "$sm",

  variants: {
    isFocused: {
      true: {
        backgroundColor: "$accents2",
      },
    },
    isSelected: {
      true: {
        backgroundColor: "$primary",
      },
    },
    isDisabled: {
      true: {
        backgroundColor: "transparent",
        color: "$accents7",
      },
    },
  },
});
