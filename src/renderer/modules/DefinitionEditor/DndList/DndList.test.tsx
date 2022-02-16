import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { mockProjectDefinition } from "renderer/utils/mocks";
import { DndList } from "./DndList";

type Props = ComponentProps<typeof DndList>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    onSelectedFieldChange: () => void 0,
    onSelectedItemChange: () => void 0,
    projectDefinition: mockProjectDefinition(),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <DndList {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<DndList />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    const header = i18n.t<string>("definitionItems", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });
});
