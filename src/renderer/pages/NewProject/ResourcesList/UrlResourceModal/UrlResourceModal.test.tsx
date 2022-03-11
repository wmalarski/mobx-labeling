import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { mockNewProjectStore } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { UrlResourceModal } from "./UrlResourceModal";

type Props = ComponentProps<typeof UrlResourceModal>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    newProjectStore: mockNewProjectStore(),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <UrlResourceModal {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<UrlResourceModal />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    const header = i18n.t<string>("resourceURL", { ns: "project" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should render modal after clicking on open and close after click close", async () => {
    expect.hasAssertions();

    const label = i18n.t<string>("resourceURL", { ns: "project" });
    const title = i18n.t<string>("addURLTitle", { ns: "project" });
    const close = i18n.t<string>("addURLCancel", { ns: "project" });

    renderComponent();

    userEvent.click(await screen.findByText(label));

    await expect(screen.findByText(title)).resolves.toBeInTheDocument();

    userEvent.click(await screen.findByText(close));
  });

  it("should change text value and save changed", async () => {
    expect.hasAssertions();

    const newProjectStore = mockNewProjectStore();
    const button = i18n.t<string>("resourceURL", { ns: "project" });
    const label = i18n.t<string>("pathLabel", { ns: "project" });
    const add = i18n.t<string>("addURLSave", { ns: "project" });

    renderComponent({ newProjectStore });

    userEvent.click(await screen.findByText(button));
    userEvent.type(await screen.findByLabelText(label), "new");
    userEvent.click(await screen.findByText(add));

    expect(newProjectStore.resources.at(-1)?.path).toBe("new");
  });
});
