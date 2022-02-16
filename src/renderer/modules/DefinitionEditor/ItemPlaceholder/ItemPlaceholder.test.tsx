import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { mockProjectDefinition } from "renderer/utils/mocks";
import { ItemPlaceholder } from "./ItemPlaceholder";

type Props = ComponentProps<typeof ItemPlaceholder>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    onSelectedItemChange: () => void 0,
    projectDefinition: mockProjectDefinition({ update: { name: "1" } }),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <ItemPlaceholder {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<ItemPlaceholder />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    const onSelectedItemChange = jest.fn();
    const projectDefinition = mockProjectDefinition({
      update: { name: "1", items: [] },
    });

    renderComponent({ projectDefinition, onSelectedItemChange });

    const label = i18n.t<string>("selectItemDefinition", {
      ns: "definition",
    });

    userEvent.click(await screen.findByText(label));

    expect(projectDefinition.items).toHaveLength(1);
    expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
  });
});
