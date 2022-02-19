import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { Definitions } from "./Definitions";

const renderComponent = ({ wrapperProps }: PropsWithTestWrapper = {}) => {
  return render(
    <TestWrapper {...wrapperProps}>
      <Definitions />
    </TestWrapper>
  );
};

describe("<Definitions />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    const header = i18n.t<string>("definitionsHeader", { ns: "definition" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });
});
