import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { mockResource } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { ResourcesListItem } from "./ResourcesListItem";

type Props = ComponentProps<typeof ResourcesListItem>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    onRemoveClick: () => void 0,
    resource: mockResource(),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <ResourcesListItem {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<ResourcesListItem />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    const label = i18n.t<string>("resourcePathLabel", { ns: "project" });
    await expect(screen.findByText(label)).resolves.toBeInTheDocument();
  });

  it("should change fps value", async () => {
    expect.hasAssertions();

    const resource = mockResource();

    renderComponent({ resource });

    const label = i18n.t<string>("resourceFpsLabel", { ns: "project" });
    const field = await screen.findByLabelText(label);

    userEvent.clear(field);
    userEvent.type(field, "10.5");

    expect(resource.fps).toBe(10);

    userEvent.clear(field);
    userEvent.type(field, "7");

    expect(resource.fps).toBe(7);
  });

  it("should change frame shift value", async () => {
    expect.hasAssertions();

    const resource = mockResource();

    renderComponent({ resource });

    const label = i18n.t<string>("resourceFrameShiftLabel", { ns: "project" });
    const field = await screen.findByLabelText(label);

    userEvent.clear(field);
    userEvent.type(field, "10.5");

    expect(resource.frameShift).toBe(10);

    userEvent.clear(field);
    userEvent.type(field, "7");

    expect(resource.frameShift).toBe(7);
  });
});
