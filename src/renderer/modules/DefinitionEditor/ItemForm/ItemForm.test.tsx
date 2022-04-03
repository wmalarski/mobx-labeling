import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import {
  mockItemDefinition,
  mockProjectDefinition,
} from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { ItemForm } from "./ItemForm";

type Props = ComponentProps<typeof ItemForm>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    itemDefinition: mockItemDefinition({ update: { name: "1" } }),
    onSelectedFieldChange: () => void 0,
    onSelectedItemChange: () => void 0,
    projectDefinition: mockProjectDefinition(),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <ItemForm {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<ItemForm />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    const header = i18n.t<string>("itemFormHeader", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should change name", async () => {
    expect.hasAssertions();

    const itemDefinition = mockItemDefinition({ update: { name: "123" } });

    renderComponent({ itemDefinition });

    const placeholder = i18n.t<string>("namePlaceholder", { ns: "definition" });
    const field = await screen.findByPlaceholderText(placeholder);

    userEvent.clear(field);
    userEvent.type(field, "NewName");

    expect(itemDefinition.name).toBe("NewName");
  });

  it("should change description", async () => {
    expect.hasAssertions();

    const itemDefinition = mockItemDefinition({ update: { name: "123" } });

    renderComponent({ itemDefinition });

    const placeholder = i18n.t<string>("descriptionPlaceholder", {
      ns: "definition",
    });
    const field = await screen.findByPlaceholderText(placeholder);

    userEvent.clear(field);
    userEvent.type(field, "NewDescription");

    expect(itemDefinition.description).toBe("NewDescription");
  });

  it("should handle removing object", async () => {
    expect.hasAssertions();

    const onSelectedItemChange = jest.fn();

    const itemDefinition = mockItemDefinition({ update: { name: "123" } });
    const projectDefinition = mockProjectDefinition({
      update: {
        name: "Project",
        items: [itemDefinition],
      },
    });

    renderComponent({
      itemDefinition,
      onSelectedItemChange,
      projectDefinition,
    });

    const removeText = i18n.t<string>("removeItem", { ns: "definition" });
    userEvent.click(await screen.findByText(removeText));

    expect(projectDefinition.items).toHaveLength(0);
    expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
    expect(onSelectedItemChange).toHaveBeenLastCalledWith(null);
  });

  it("should handle copying field", async () => {
    expect.hasAssertions();

    const onSelectedItemChange = jest.fn();

    const itemDefinition = mockItemDefinition({ update: { name: "123" } });
    const projectDefinition = mockProjectDefinition({
      update: {
        name: "Project",
        items: [itemDefinition],
      },
    });

    renderComponent({
      itemDefinition,
      onSelectedItemChange,
      projectDefinition,
    });

    const copyText = i18n.t<string>("copyItem", { ns: "definition" });
    userEvent.click(await screen.findByText(copyText));

    expect(projectDefinition.items).toHaveLength(2);

    const newId = projectDefinition.items.at(1)?.id;
    expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
    expect(onSelectedItemChange).toHaveBeenLastCalledWith(newId);
  });

  it("should add new field", async () => {
    expect.hasAssertions();

    const onSelectedFieldChange = jest.fn();
    const itemDefinition = mockItemDefinition({ update: { fields: [] } });

    renderComponent({ onSelectedFieldChange, itemDefinition });

    const label = i18n.t<string>("addNewField", { ns: "definition" });
    const button = await screen.findByText(label);
    userEvent.click(button);

    expect(itemDefinition.fields).toHaveLength(1);
    expect(onSelectedFieldChange).toHaveBeenCalledTimes(1);
  });
});
