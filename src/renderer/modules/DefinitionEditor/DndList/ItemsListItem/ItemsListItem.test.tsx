import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { DragDropContext, DragDropContextProps } from "react-beautiful-dnd";
import { mockItemDefinition } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { ItemsListItem } from "./ItemsListItem";

type Props = ComponentProps<typeof ItemsListItem>;

const renderComponent = ({
  wrapperProps,
  onDragEnd,
  ...props
}: PropsWithTestWrapper<Partial<Props>> & {
  onDragEnd?: DragDropContextProps["onDragEnd"];
} = {}) => {
  const handleDragEnd = onDragEnd ?? (() => void 0);
  const defaultProps: Props = {
    itemDefinition: mockItemDefinition(),
    onFieldClick: () => void 0,
    onItemClick: () => void 0,
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <ItemsListItem {...defaultProps} {...props} />
      </DragDropContext>
    </TestWrapper>
  );
};

describe("<ItemsListItem />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    const itemDefinition = mockItemDefinition();

    renderComponent({ itemDefinition });

    await expect(
      screen.findByText(itemDefinition.name)
    ).resolves.toBeInTheDocument();
  });

  it("should click on item", async () => {
    expect.hasAssertions();

    const onItemClick = jest.fn();
    const itemDefinition = mockItemDefinition({
      update: { fields: [], description: "Desc" },
    });
    const name = itemDefinition.name;

    renderComponent({ onItemClick, itemDefinition });

    const button = await screen.findByText(name);
    userEvent.click(button);

    expect(onItemClick).toHaveBeenCalledTimes(1);
  });

  it("should click on field", async () => {
    expect.hasAssertions();

    const onFieldClick = jest.fn();

    renderComponent({ onFieldClick });

    const button = await screen.findAllByTestId("field-item");
    userEvent.click(button[0]);

    expect(onFieldClick).toHaveBeenCalledTimes(1);
  });
});
