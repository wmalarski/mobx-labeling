import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { mockFieldDefinition } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { FieldListItem } from "./FieldListItem";

type Props = ComponentProps<typeof FieldListItem>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    onClick: () => void 0,
    fieldDefinition: mockFieldDefinition(),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <FieldListItem {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<FieldListItem />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    const fieldDefinition = mockFieldDefinition({
      update: { description: "Desc" },
    });

    renderComponent({ fieldDefinition });

    await expect(
      screen.findByText(fieldDefinition.name)
    ).resolves.toBeInTheDocument();
  });

  it("should click on card", async () => {
    expect.hasAssertions();

    const onClick = jest.fn();
    const fieldDefinition = mockFieldDefinition();

    renderComponent({ onClick, fieldDefinition });

    const button = await screen.findByText(fieldDefinition.name);
    userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
