import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { routePaths } from "renderer/utils/routes";
import { Home } from "./Home";

const renderComponent = ({ wrapperProps }: PropsWithTestWrapper = {}) => {
  return render(
    <TestWrapper {...wrapperProps}>
      <Home />
    </TestWrapper>
  );
};

describe("<Home />", () => {
  beforeEach(() => {
    jest.requireMock("react-location").mockNavigate.mockReset();
  });

  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    const header = i18n.t<string>("recentHeader", { ns: "home" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should navigate to new definition after click", async () => {
    expect.hasAssertions();

    const mockNavigate = jest.requireMock("react-location").mockNavigate;

    renderComponent();

    const text = i18n.t<string>("navDefinitions", { ns: "home" });
    userEvent.click(await screen.findByText(text));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith({
      to: routePaths.definitions,
    });
  });

  it("should navigate to new new project page", async () => {
    expect.hasAssertions();

    const mockNavigate = jest.requireMock("react-location").mockNavigate;

    renderComponent();

    const text = i18n.t<string>("navNewProject", { ns: "home" });
    userEvent.click(await screen.findByText(text));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith({
      to: routePaths.newProject,
    });
  });
});
