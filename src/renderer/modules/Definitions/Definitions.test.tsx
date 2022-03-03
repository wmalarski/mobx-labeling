import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  mockDefinitionEntries,
  mockElectronServices,
  mockIpcDefinitionsService,
} from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { routePaths } from "renderer/utils/routes";
import { Definitions } from "./Definitions";

const renderComponent = ({ wrapperProps }: PropsWithTestWrapper = {}) => {
  return render(
    <TestWrapper {...wrapperProps}>
      <Definitions />
    </TestWrapper>
  );
};

describe("<Definitions />", () => {
  beforeEach(() => {
    jest.requireMock("react-location").mockNavigate.mockReset();
  });

  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    const header = i18n.t<string>("definitionsHeader", { ns: "definition" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should show first definition name", async () => {
    expect.hasAssertions();

    const entries = mockDefinitionEntries();
    const firstDefinition = entries[0].name;
    window.electron = mockElectronServices({
      ipcDefinitions: mockIpcDefinitionsService({
        updateEntries: entries,
      }),
    });

    renderComponent();

    await waitFor(async () => {
      await expect(
        screen.findByText(firstDefinition)
      ).resolves.toBeInTheDocument();
    });

    await expect(
      screen.findByText(firstDefinition)
    ).resolves.toBeInTheDocument();
  });

  it("should change page", async () => {
    expect.hasAssertions();

    const entries = mockDefinitionEntries({ entriesCount: 12 });
    const lastDefinition = entries[entries.length - 1].name;
    window.electron = mockElectronServices({
      ipcDefinitions: mockIpcDefinitionsService({
        updateEntries: entries,
      }),
    });

    renderComponent();

    expect(screen.queryByText(lastDefinition)).toBeNull();

    userEvent.click(await screen.findByText("2"));

    await waitFor(async () => {
      await expect(
        screen.findByText(lastDefinition)
      ).resolves.toBeInTheDocument();
    });

    await expect(
      screen.findByText(lastDefinition)
    ).resolves.toBeInTheDocument();
  });

  it("should change query", async () => {
    expect.hasAssertions();

    const entries = mockDefinitionEntries({ entriesCount: 12 });
    const lastDefinition = entries[entries.length - 1].name;
    window.electron = mockElectronServices({
      ipcDefinitions: mockIpcDefinitionsService({
        updateEntries: entries,
      }),
    });

    renderComponent();

    expect(screen.queryByText(lastDefinition)).toBeNull();

    const label = i18n.t<string>("searchPlaceholder", { ns: "definition" });
    userEvent.type(await screen.findByLabelText(label), lastDefinition);

    await waitFor(async () => {
      await expect(
        screen.findByText(lastDefinition)
      ).resolves.toBeInTheDocument();
    });

    await expect(
      screen.findByText(lastDefinition)
    ).resolves.toBeInTheDocument();
  });

  it("should receive remove event", async () => {
    expect.hasAssertions();

    const removeDefinition = jest.fn(() => Promise.resolve());
    const entries = mockDefinitionEntries({ entriesCount: 1 });
    window.electron = mockElectronServices({
      ipcDefinitions: mockIpcDefinitionsService({
        updateEntries: entries,
        update: {
          removeDefinition,
        },
      }),
    });

    renderComponent();

    const label = i18n.t<string>("removeDefinition", { ns: "definition" });

    await waitFor(async () => {
      await expect(screen.findByText(label)).resolves.toBeInTheDocument();
    });

    userEvent.click(await screen.findByText(label));

    expect(removeDefinition).toHaveBeenCalledTimes(1);
  });

  it("should navigate to new definition after click", async () => {
    expect.hasAssertions();

    const mockNavigate = jest.requireMock("react-location").mockNavigate;

    renderComponent();

    const text = i18n.t<string>("newDefinitionButton", { ns: "definition" });
    userEvent.click(await screen.findByText(text));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith({
      to: routePaths.newDefinition,
    });
  });
});
