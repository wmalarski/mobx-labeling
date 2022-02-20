import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
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
    onSelectedItemChange: () => void 0,
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

  it("should save definition", async () => {
    expect.hasAssertions();

    const definitionStore = mockDefinitionStore();
    const saveDefinition = jest.fn(() => Promise.resolve());
    window.electron = {
      ipcDefinitions: {
        saveDefinition,
        readDefinition: jest.fn(),
        readDefinitions: jest.fn(),
        removeDefinition: jest.fn(),
      },
    };

    renderComponent({ definitionStore });

    const label = i18n.t<string>("saveDefinition", { ns: "definition" });
    const success = i18n.t<string>("definitionSaved", { ns: "definition" });
    const button = await screen.findByText(label);

    userEvent.click(button);

    await waitFor(async () => {
      await expect(screen.findByText(success)).resolves.toBeInTheDocument();
    });

    await expect(screen.findByText(success)).resolves.toBeInTheDocument();
    expect(saveDefinition).toHaveBeenCalledTimes(1);
  });

  it("should fail saving and show error message", async () => {
    expect.hasAssertions();

    const definitionStore = mockDefinitionStore();
    const saveDefinition = jest.fn(() => Promise.reject());
    window.electron = {
      ipcDefinitions: {
        saveDefinition,
        readDefinition: jest.fn(),
        readDefinitions: jest.fn(),
        removeDefinition: jest.fn(),
      },
    };

    renderComponent({ definitionStore });

    const label = i18n.t<string>("saveDefinition", { ns: "definition" });
    const fail = i18n.t<string>("saveFailed", { ns: "definition" });
    const button = await screen.findByText(label);

    userEvent.click(button);

    await waitFor(async () => {
      await expect(screen.findByText(fail)).resolves.toBeInTheDocument();
    });

    await expect(screen.findByText(fail)).resolves.toBeInTheDocument();
    expect(saveDefinition).toHaveBeenCalledTimes(1);
  });

  it("should add new item after click on add", async () => {
    expect.hasAssertions();

    const definitionStore = mockDefinitionStore({});
    const initialLength = definitionStore.projectDefinition.items.length;

    renderComponent({ definitionStore });

    const text = i18n.t<string>("addNewItem", { ns: "definition" });
    userEvent.click(await screen.findByText(text));

    expect(definitionStore.projectDefinition.items).toHaveLength(
      initialLength + 1
    );
  });
});
