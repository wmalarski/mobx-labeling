import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import {
  mockDefinitionEntries,
  mockIpcDefinitionsService,
} from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { Definitions } from "./Definitions";

const renderComponent = ({ wrapperProps }: PropsWithTestWrapper = {}) => {
  return render(
    <TestWrapper {...wrapperProps}>
      <Definitions />
    </TestWrapper>
  );
};

describe("<Definitions />", () => {
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
    window.electron = {
      ipcDefinitions: mockIpcDefinitionsService({
        updateEntries: entries,
      }),
    };

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
});
