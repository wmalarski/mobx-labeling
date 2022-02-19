import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { mockItemDefinition } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { FieldPlaceholder } from "./FieldPlaceholder";

type Props = ComponentProps<typeof FieldPlaceholder>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    itemDefinition: mockItemDefinition({ update: { name: "1" } }),
    onSelectedFieldChange: () => void 0,
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <FieldPlaceholder {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<FieldPlaceholder />", () => {
  it("should render and create field after click", async () => {
    expect.hasAssertions();

    const onSelectedFieldChange = jest.fn();
    const itemDefinition = mockItemDefinition({
      update: { name: "1", fields: [] },
    });

    renderComponent({ onSelectedFieldChange, itemDefinition });

    const label = i18n.t<string>("selectFieldDefinition", {
      ns: "definition",
    });

    userEvent.click(await screen.findByText(label));

    expect(itemDefinition.fields).toHaveLength(1);
    expect(onSelectedFieldChange).toHaveBeenCalledTimes(1);
  });
});
