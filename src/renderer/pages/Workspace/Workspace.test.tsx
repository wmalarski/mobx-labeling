import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { Workspace } from "./Workspace";

const renderComponent = ({ wrapperProps }: PropsWithTestWrapper = {}) => {
  return render(
    <TestWrapper {...wrapperProps}>
      <Workspace />
    </TestWrapper>
  );
};

describe("<Workspace />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    await expect(screen.findByText("Workspace")).resolves.toBeInTheDocument();
  });
});
