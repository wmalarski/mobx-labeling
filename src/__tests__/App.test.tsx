import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import App from "../renderer/App";

describe("app", () => {
  it("should render", () => {
    expect.hasAssertions();
    expect(render(<App />)).toBeTruthy();
  });
});
