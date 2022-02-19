import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { mockProjectDefinition } from "renderer/utils/mocks";
import { DefinitionEditor } from "./DefinitionEditor";

type Props = ComponentProps<typeof DefinitionEditor>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    projectDefinition: mockProjectDefinition(),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <DefinitionEditor {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<DefinitionEditor />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    const header = i18n.t<string>("newDefinitionHeader", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should select first item", async () => {
    expect.hasAssertions();

    const projectDefinition = mockProjectDefinition();
    const itemDefinition = projectDefinition.items[0];

    renderComponent({ projectDefinition });

    userEvent.click(await screen.findByText(itemDefinition.name));

    const header = i18n.t<string>("itemFormHeader", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should select first field", async () => {
    expect.hasAssertions();

    const projectDefinition = mockProjectDefinition();
    const itemDefinition = projectDefinition.items[0];
    const fieldDefinition = itemDefinition.fields[0];

    renderComponent({ projectDefinition });

    const cards = await screen.findAllByText(fieldDefinition.name);
    userEvent.click(cards[0]);

    const header = i18n.t<string>("fieldFormHeader", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });
});
