import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { ColorSlider } from "./ColorSlider";

type Props = ComponentProps<typeof ColorSlider>;

const defaultProps: Props = {
  channel: "hue",
  value: "hsl(25, 100%, 50%)",
};

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  return render(
    <TestWrapper {...wrapperProps}>
      <ColorSlider {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<ColorSlider />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    await expect(screen.findByText("Hue")).resolves.toBeInTheDocument();
  });
});
