import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { mockFieldDefinition } from "renderer/utils/mocks";
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

    renderComponent({ onClick });

    const button = await screen.findByRole("button");
    userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
