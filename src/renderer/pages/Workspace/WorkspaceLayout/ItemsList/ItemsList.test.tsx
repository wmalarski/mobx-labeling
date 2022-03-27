import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import { mockWorkspaceStore } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { ItemsList } from "./ItemsList";

type Props = ComponentProps<typeof ItemsList>;

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
      <ItemsList {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<ItemsList />", () => {
  it("should render empty list", async () => {
    expect.hasAssertions();

    renderComponent();

    const header = i18n.t<string>("itemsList", { ns: "workspace" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();

    const warning = i18n.t<string>("itemTableEmpty", { ns: "workspace" });
    await expect(screen.findByText(warning)).resolves.toBeInTheDocument();
  });

  it("should render list with item", async () => {
    expect.hasAssertions();

    const workspaceStore = mockWorkspaceStore();
    const itemDefinition = workspaceStore.project.definition.items[0];
    workspaceStore.addItem(itemDefinition);
    renderComponent({ workspaceStore });

    const header = i18n.t<string>("itemsList", { ns: "workspace" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();

    await expect(
      screen.findByText(itemDefinition.name)
    ).resolves.toBeInTheDocument();
  });
});
