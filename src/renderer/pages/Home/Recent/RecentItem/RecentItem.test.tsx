import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { mockProjectEntry } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { routePaths } from "renderer/utils/routes";
import { RecentItem } from "./RecentItem";

type Props = ComponentProps<typeof RecentItem>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    projectEntry: mockProjectEntry(),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <RecentItem {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<RecentItem />", () => {
  beforeEach(() => {
    jest.requireMock("react-location").mockNavigate.mockReset();
  });

  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    const header = i18n.t<string>("nameLabel", { ns: "home" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should redirect to workspace", async () => {
    expect.hasAssertions();

    const mockNavigate = jest.requireMock("react-location").mockNavigate;
    const label = i18n.t<string>("openProject", { ns: "home" });
    const projectEntry = mockProjectEntry();

    renderComponent({ projectEntry });

    userEvent.click(await screen.findByText(label));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith({
      to: routePaths.workspace,
      search: { project: projectEntry.projectPath },
    });
  });
});
