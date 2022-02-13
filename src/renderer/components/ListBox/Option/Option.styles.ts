import { styled } from "@nextui-org/react";

export const Li = styled("li", {
  padding: "$xs $md",
  outline: "none",
  cursor: "pointer",
  color: "$text",
  borderRadius: "$sm",

  variants: {
    isSelected: {
      true: {
        backgroundColor: "$primary",
      },
    },
    isFocused: {
      true: {
        backgroundColor: "$accents2",
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
