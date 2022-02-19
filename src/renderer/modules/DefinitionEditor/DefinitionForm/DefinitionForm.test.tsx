import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { mockDefinitionStore } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { DefinitionForm } from "./DefinitionForm";

type Props = ComponentProps<typeof DefinitionForm>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    definitionStore: mockDefinitionStore(),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <DefinitionForm {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<DefinitionForm />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    const header = i18n.t<string>("newDefinitionHeader", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should change name", async () => {
    expect.hasAssertions();

    const definitionStore = mockDefinitionStore({ update: { name: "" } });

    renderComponent({ definitionStore });

    const label = i18n.t<string>("namePlaceholder", { ns: "definition" });
    const field = await screen.findByLabelText(label);

    userEvent.type(field, "name");

    expect(definitionStore.projectDefinition.name).toBe("name");
  });

  it("should change description", async () => {
    expect.hasAssertions();

    const definitionStore = mockDefinitionStore();

    renderComponent({ definitionStore });

    const label = i18n.t<string>("descriptionPlaceholder", {
      ns: "definition",
    });
    const field = await screen.findByLabelText(label);

    userEvent.type(field, "descriptionPlaceholder");

    expect(definitionStore.projectDefinition.description).toBe(
      "descriptionPlaceholder"
    );
  });
});
