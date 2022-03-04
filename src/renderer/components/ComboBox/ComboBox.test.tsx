import { Item } from "@react-stately/collections";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { ComboBox } from "./ComboBox";

type Props = ComponentProps<typeof ComboBox>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Omit<Props, "children"> = {};

  return render(
    <TestWrapper {...wrapperProps}>
      <button>Outside</button>
      <ComboBox {...defaultProps} {...props}>
        <Item>Red</Item>
        <Item>Orange</Item>
        <Item>Yellow</Item>
        <Item>Green</Item>
        <Item>Blue</Item>
        <Item>Purple</Item>
        <Item>Black</Item>
        <Item>White</Item>
        <Item>Lime</Item>
        <Item>Fushsia</Item>
      </ComboBox>
    </TestWrapper>
  );
};

describe("<ComboBox />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    renderComponent({
      label: "Label",
    });

    await expect(screen.findByText("▼")).resolves.toBeInTheDocument();
  });

  it("should render and close on click outside", async () => {
    expect.hasAssertions();

    renderComponent();

    userEvent.click(await screen.findByText("▼"));

    await expect(
      screen.findByText("Green", { selector: "li" })
    ).resolves.toBeInTheDocument();

    userEvent.click(await screen.findByLabelText("Dismiss"));

    expect(screen.queryByText("Green", { selector: "li" })).toBeNull();
  });
});
