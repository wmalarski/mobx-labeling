import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { ToolKind } from "renderer/models";
import { mockWorkspaceStore } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { TopBar } from "./TopBar";

type Props = ComponentProps<typeof TopBar>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    workspaceStore: mockWorkspaceStore(),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <TopBar {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<TopBar />", () => {
  it("should change tool to cursor", async () => {
    expect.hasAssertions();

    const workspaceStore = mockWorkspaceStore({
      update: { tool: { kind: ToolKind.Drag } },
    });

    renderComponent({ workspaceStore });

    const header = i18n.t<string>("cursorButton", { ns: "workspace" });
    userEvent.click(await screen.findByLabelText(header));

    expect(workspaceStore.tool.kind).toBe(ToolKind.Selector);
  });

  it("should change tool to Drag", async () => {
    expect.hasAssertions();

    const workspaceStore = mockWorkspaceStore({
      update: { tool: { kind: ToolKind.Selector } },
    });

    renderComponent({ workspaceStore });

    const header = i18n.t<string>("dragButton", { ns: "workspace" });
    userEvent.click(await screen.findByLabelText(header));

    expect(workspaceStore.tool.kind).toBe(ToolKind.Drag);
  });

  it("should change current frame", async () => {
    expect.hasAssertions();

    const workspaceStore = mockWorkspaceStore();

    renderComponent({ workspaceStore });

    const header = i18n.t<string>("currentFrameLabel", { ns: "workspace" });
    const input = await screen.findByLabelText(header);
    userEvent.clear(input);
    userEvent.type(input, "44");

    expect(workspaceStore.currentFrame.frame).toBe(44);
  });
});
