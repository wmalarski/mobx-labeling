import { styled } from "@nextui-org/react";

const TRACK_THICKNESS = 28;
const THUMB_SIZE = 20;

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 300,
});

export const Content = styled("div", {
  display: "flex",
  alignSelf: "stretch",
});

export const Output = styled("output", {
  flex: "1 0 auto",
  textAlign: "end",
});

export const Track = styled("div", {
  height: TRACK_THICKNESS,
  width: "100%",
  borderRadius: 4,
});

export const Thumb = styled("div", {
  top: TRACK_THICKNESS / 2,
  border: "2px solid white",
  boxShadow: "0 0 0 1px black, inset 0 0 0 1px black",
  borderRadius: "50%",
  boxSizing: "border-box",

  variants: {
    isFocusVisible: {
      true: {
        width: TRACK_THICKNESS + 4,
        height: TRACK_THICKNESS + 4,
      },
      false: {
        width: THUMB_SIZE,
        height: THUMB_SIZE,
      },
    },
  },
});
