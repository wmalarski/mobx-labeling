import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import { mockWorkspaceStore } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { Comments } from "./Comments";

type Props = ComponentProps<typeof Comments>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    node: {} as any,
    workspaceStore: mockWorkspaceStore(),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <Comments {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<Comments />", () => {
  it("should add item", async () => {
    expect.hasAssertions();

    const workspaceStore = mockWorkspaceStore();

    renderComponent({ workspaceStore });

    const header = i18n.t<string>("commentsNode", { ns: "workspace" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });
});
