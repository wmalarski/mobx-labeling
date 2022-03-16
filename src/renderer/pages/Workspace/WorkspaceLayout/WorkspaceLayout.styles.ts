import { styled } from "renderer/styles/config";

export const Container = styled("div", {
  left: 0,
  top: 0,
  width: "100vw",
  height: "100vh",
  overflow: "clip",
  position: "absolute",
  display: "flex",
  flexDirection: "column",
});

export const Wrapper = styled("div", {
  flexGrow: 1,
  position: "relative",
});
