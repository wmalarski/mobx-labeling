import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import {
  mockElectronServices,
  mockIpcResourcesService,
  mockNewProjectStore,
} from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { ResourcesList } from "./ResourcesList";

type Props = ComponentProps<typeof ResourcesList>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    newProjectStore: mockNewProjectStore(),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <ResourcesList {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<ResourcesList />", () => {
  beforeEach(() => {
    window.electron = mockElectronServices();
  });

  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    const header = i18n.t<string>("resourcesList", { ns: "project" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should remove resource after click remove", async () => {
    expect.hasAssertions();

    const newProjectStore = mockNewProjectStore({
      update: {
        resources: [{ fps: 10, frameShift: 0, path: "" }],
      },
    });

    renderComponent({ newProjectStore });

    const label = i18n.t<string>("resourceRemove", { ns: "project" });

    userEvent.click(await screen.findByText(label));

    expect(newProjectStore.resources).toHaveLength(0);
  });

  it("should trigger window open method after open click", async () => {
    expect.hasAssertions();

    const openDialog = jest.fn();

    window.electron = mockElectronServices({
      ipcResources: mockIpcResourcesService({
        update: {
          openDialog,
        },
      }),
    });

    renderComponent();

    const label = i18n.t<string>("resourceLocal", { ns: "project" });

    userEvent.click(await screen.findByText(label));

    expect(openDialog).toHaveBeenCalledTimes(1);
  });

  it("should add resources after successful selection", async () => {
    expect.hasAssertions();

    const addOnOpenListener = jest.fn((listener) => {
      listener({}, { canceled: false, filePaths: ["newPath"] });
    });

    const newProjectStore = mockNewProjectStore();

    window.electron = mockElectronServices({
      ipcResources: mockIpcResourcesService({
        update: {
          addOnOpenListener,
        },
      }),
    });

    renderComponent({ newProjectStore });

    const header = i18n.t<string>("resourcesList", { ns: "project" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();

    expect(newProjectStore.resources).toHaveLength(1);
  });
});
