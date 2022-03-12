import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import {
  mockElectronServices,
  mockProjectEntries,
  mockProjectsList,
} from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { Recent } from "./Recent";

type Props = ComponentProps<typeof Recent>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    projectsList: mockProjectsList(),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <Recent {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<Recent />", () => {
  beforeEach(() => {
    window.electron = mockElectronServices();
  });

  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    const header = i18n.t<string>("searchPlaceholder", { ns: "home" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should change query", async () => {
    expect.hasAssertions();

    const projectsList = mockProjectEntries();
    const project = projectsList[11].name;
    const placeholder = i18n.t<string>("searchPlaceholder", { ns: "home" });

    renderComponent();

    userEvent.type(await screen.findByPlaceholderText(placeholder), project);

    await waitFor(async () => {
      await expect(screen.findByText(project)).resolves.toBeInTheDocument();
    });
    await expect(screen.findByText(project)).resolves.toBeInTheDocument();
  });

  it("should change page", async () => {
    expect.hasAssertions();

    const projectsList = mockProjectEntries();
    const project1 = projectsList[0].name;
    const project2 = projectsList[1].name;

    renderComponent();

    await waitFor(async () => {
      await expect(screen.findByText(project1)).resolves.toBeInTheDocument();
    });
    await expect(screen.findByText(project1)).resolves.toBeInTheDocument();

    userEvent.click(await screen.findByText("2"));

    await waitFor(async () => {
      await expect(screen.findByText(project2)).resolves.toBeInTheDocument();
    });
    await expect(screen.findByText(project2)).resolves.toBeInTheDocument();
  });
});
