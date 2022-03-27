import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { mockWorkspaceStore } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { ItemHeader } from "./ItemHeader";

type Props = ComponentProps<typeof ItemHeader>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const workspaceStore = mockWorkspaceStore({ items: 1 });
  const item = workspaceStore.batch.items[0];

  const defaultProps: Props = { item, workspaceStore };

  return render(
    <TestWrapper {...wrapperProps}>
      <ItemHeader {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<ItemHeader />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    const header = i18n.t<string>("itemRemove", { ns: "workspace" });
    await expect(screen.findByLabelText(header)).resolves.toBeInTheDocument();
  });

  it("should remove item", async () => {
    expect.hasAssertions();

    const workspaceStore = mockWorkspaceStore({ items: 1 });
    const item = workspaceStore.batch.items[0];

    renderComponent({ item, workspaceStore });

    const header = i18n.t<string>("itemRemove", { ns: "workspace" });
    userEvent.click(await screen.findByLabelText(header));

    expect(workspaceStore.batch.items).toHaveLength(0);
  });

  it("should change name", async () => {
    expect.hasAssertions();

    const workspaceStore = mockWorkspaceStore({ items: 1 });
    const item = workspaceStore.batch.items[0];

    renderComponent({ item, workspaceStore });

    const edit = i18n.t<string>("itemEditName", { ns: "workspace" });
    const button = await screen.findByLabelText(edit);
    userEvent.click(button);

    const label = i18n.t<string>("itemNameLabel", { ns: "workspace" });
    const input = await screen.findByLabelText(label);
    userEvent.clear(input);
    userEvent.type(input, "hello123");

    userEvent.click(button);

    expect(item.name).toBe("hello123");
  });

  it("should change block state", async () => {
    expect.hasAssertions();

    const workspaceStore = mockWorkspaceStore({ items: 1 });
    const item = workspaceStore.batch.items[0];

    renderComponent({ item, workspaceStore });

    const unblock = i18n.t<string>("itemUnblock", { ns: "workspace" });
    const input = await screen.findByLabelText(unblock);
    userEvent.click(input);

    expect(item.blocked).toBeTruthy();

    const block = i18n.t<string>("itemBlock", { ns: "workspace" });
    const button = await screen.findByLabelText(block);
    userEvent.click(button);

    expect(item.blocked).toBeFalsy();
  });
});
