import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { mockProjectDefinition } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { DndList } from "./DndList";

type Props = ComponentProps<typeof DndList>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    onSelectedFieldChange: () => void 0,
    onSelectedItemChange: () => void 0,
    projectDefinition: mockProjectDefinition(),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <DndList {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<DndList />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    const header = i18n.t<string>("definitionItems", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should invoke change", async () => {
    expect.hasAssertions();

    const projectDefinition = mockProjectDefinition({});

    renderComponent({ projectDefinition });

    userEvent.tab();
    userEvent.tab();
    userEvent.keyboard("{space}{arrowdown}");
    userEvent.keyboard("{space}");

    const header = i18n.t<string>("definitionItems", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();

    expect(projectDefinition.items[0].name).toBe("Item1");
    expect(projectDefinition.items[1].name).toBe("Item0");
  });

  it("should add new item after click on add", async () => {
    expect.hasAssertions();

    const projectDefinition = mockProjectDefinition({});
    const initialLength = projectDefinition.items.length;

    renderComponent({ projectDefinition });

    const text = i18n.t<string>("addNewItem", { ns: "definition" });
    userEvent.click(await screen.findByText(text));

    expect(projectDefinition.items).toHaveLength(initialLength + 1);
  });

  it("should emit item id change after click on name", async () => {
    expect.hasAssertions();

    const projectDefinition = mockProjectDefinition({});
    const firstItem = projectDefinition.items[0];
    const onSelectedItemChange = jest.fn();

    renderComponent({ projectDefinition, onSelectedItemChange });

    userEvent.click(await screen.findByText(firstItem.name));

    expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
    expect(onSelectedItemChange).toHaveBeenCalledWith(firstItem.id);
  });
});
