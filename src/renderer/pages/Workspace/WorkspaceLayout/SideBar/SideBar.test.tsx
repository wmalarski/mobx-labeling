import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { mockWorkspaceStore } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { SideBar } from "./SideBar";

type Props = ComponentProps<typeof SideBar>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    workspaceStore: mockWorkspaceStore(),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <SideBar {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<SideBar />", () => {
  it("should add item", async () => {
    expect.hasAssertions();

    const workspaceStore = mockWorkspaceStore();

    renderComponent({ workspaceStore });

    const header = workspaceStore.project.definition.items[0].name;
    userEvent.click(await screen.findByText(header));

    expect(workspaceStore.batch.items).toHaveLength(1);
  });
});
