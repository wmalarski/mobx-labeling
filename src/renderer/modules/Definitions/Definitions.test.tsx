import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import { getSnapshot } from "mobx-state-tree";
import { mockDefinitionEntries } from "renderer/tests/mocks";
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

    const definitions = mockDefinitionEntries().map((entry) =>
      getSnapshot(entry)
    );
    const firstDefinition = definitions[0].name;
    window.electron = {
      ipcDefinitions: {
        saveDefinition: jest.fn(),
        readDefinition: jest.fn(),
        readDefinitions: jest.fn(() => Promise.resolve(definitions)),
        removeDefinition: jest.fn(),
      },
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
