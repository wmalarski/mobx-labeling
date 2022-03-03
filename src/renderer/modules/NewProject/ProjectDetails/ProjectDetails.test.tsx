import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import {
  mockDefinitionEntries,
  mockIpcDefinitionsService,
  mockIpcResourcesService,
  mockNewProjectStore,
} from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { ProjectDetails } from "./ProjectDetails";

type Props = ComponentProps<typeof ProjectDetails>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    newProjectStore: mockNewProjectStore(),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <ProjectDetails {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<ProjectDetails />", () => {
  beforeEach(() => {
    window.electron = {
      ipcResources: mockIpcResourcesService(),
      ipcDefinitions: mockIpcDefinitionsService(),
    };
  });

  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    const header = i18n.t<string>("batchSizePlaceholder", { ns: "project" });
    await expect(screen.findAllByText(header)).resolves.toHaveLength(2);
  });

  it("should change name", async () => {
    expect.hasAssertions();

    const newProjectStore = mockNewProjectStore({ update: { name: "" } });

    renderComponent({ newProjectStore });

    const label = i18n.t<string>("namePlaceholder", { ns: "project" });
    const field = await screen.findByLabelText(label);

    userEvent.type(field, "name");

    expect(newProjectStore.name).toBe("name");
  });

  it("should change path", async () => {
    expect.hasAssertions();

    const newProjectStore = mockNewProjectStore({
      update: { projectPath: "" },
    });

    renderComponent({ newProjectStore });

    const label = i18n.t<string>("locationLabel", { ns: "project" });
    const field = await screen.findByLabelText(label);

    userEvent.type(field, "path");

    expect(newProjectStore.projectPath).toBe("path");
  });

  it("should change batch size value", async () => {
    expect.hasAssertions();

    const newProjectStore = mockNewProjectStore();

    renderComponent({ newProjectStore });

    const label = i18n.t<string>("batchSizePlaceholder", { ns: "project" });
    const field = await screen.findByLabelText(label);

    userEvent.clear(field);
    userEvent.type(field, "10.5");

    expect(newProjectStore.batchSize).toBe(10);

    userEvent.clear(field);
    userEvent.type(field, "7");

    expect(newProjectStore.batchSize).toBe(7);
  });

  it("should change definition", async () => {
    expect.hasAssertions();

    const entries = mockDefinitionEntries();
    const firstEntry = entries[0];
    window.electron = {
      ipcResources: mockIpcResourcesService(),
      ipcDefinitions: mockIpcDefinitionsService({
        updateEntries: entries,
      }),
    };

    const newProjectStore = mockNewProjectStore();

    renderComponent({ newProjectStore });

    const label = i18n.t<string>("selectDefinitionLabel", { ns: "project" });
    const field = await screen.findByLabelText(label, { selector: "input" });

    userEvent.type(field, firstEntry.name.slice(0, 3));

    userEvent.click(await screen.findByText(firstEntry.name));

    expect(newProjectStore.definitionId).toBe(firstEntry.id);
  });

  it("should change save path after dialog return", async () => {
    expect.hasAssertions();

    const addOnSaveListener = jest.fn((listener) => {
      listener({}, { canceled: false, filePath: "newPath" });
    });

    const newProjectStore = mockNewProjectStore();

    window.electron = {
      ipcDefinitions: mockIpcDefinitionsService(),
      ipcResources: mockIpcResourcesService({
        update: {
          addOnSaveListener,
        },
      }),
    };

    renderComponent({ newProjectStore });

    const label = i18n.t<string>("selectDefinitionLabel", { ns: "project" });
    const field = await screen.findByLabelText(label, { selector: "input" });
    expect(field).toBeInTheDocument();

    expect(newProjectStore.projectPath).toBe("newPath");
  });

  it("should not change save path after dialog return when unsuccessful", async () => {
    expect.hasAssertions();

    const addOnSaveListener = jest.fn((listener) => {
      listener({}, { canceled: false });
    });

    const newProjectStore = mockNewProjectStore();

    window.electron = {
      ipcDefinitions: mockIpcDefinitionsService(),
      ipcResources: mockIpcResourcesService({
        update: {
          addOnSaveListener,
        },
      }),
    };

    renderComponent({ newProjectStore });

    const label = i18n.t<string>("selectDefinitionLabel", { ns: "project" });
    const field = await screen.findByLabelText(label, { selector: "input" });
    expect(field).toBeInTheDocument();

    expect(newProjectStore.projectPath).toBe("");
  });

  it("should receive request to show dialog", async () => {
    expect.hasAssertions();

    const saveDialog = jest.fn();

    const newProjectStore = mockNewProjectStore();

    window.electron = {
      ipcDefinitions: mockIpcDefinitionsService(),
      ipcResources: mockIpcResourcesService({
        update: {
          saveDialog,
        },
      }),
    };

    renderComponent({ newProjectStore });

    const label = i18n.t<string>("browseLocation", { ns: "project" });
    const icon = await screen.findByLabelText(label, { selector: "svg" });

    userEvent.click(icon);

    expect(saveDialog).toHaveBeenCalledTimes(1);
  });
});
