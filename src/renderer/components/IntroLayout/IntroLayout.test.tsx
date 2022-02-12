import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { IntroLayout } from "./IntroLayout";

type Props = ComponentProps<typeof IntroLayout>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    children: "Text",
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <IntroLayout {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<IntroLayout />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    await expect(screen.findByText("Text")).resolves.toBeInTheDocument();
  });
});
