import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { ItemDefinition } from "renderer/models/definition";
import { ComboBoxDefinition } from "renderer/models/fields/comboBox";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { FieldForm } from "./FieldForm";

type Props = ComponentProps<typeof FieldForm>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const fieldDefinition = ComboBoxDefinition.create({ name: "123" });
  const defaultProps: Props = {
    fieldDefinition,
    itemDefinition: ItemDefinition.create({
      name: "Item",
      fields: [fieldDefinition],
    }),
    onSelectedFieldChange: () => void 0,
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <FieldForm {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<FieldForm />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    const header = i18n.t<string>("fieldFormHeader", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should change name", async () => {
    expect.hasAssertions();

    const fieldDefinition = ComboBoxDefinition.create({ name: "123" });

    renderComponent({ fieldDefinition });

    const placeholder = i18n.t<string>("namePlaceholder", { ns: "definition" });
    const field = await screen.findByPlaceholderText(placeholder);

    userEvent.clear(field);
    userEvent.type(field, "NewName");

    expect(fieldDefinition.name).toBe("NewName");
  });

  it("should change description", async () => {
    expect.hasAssertions();

    const fieldDefinition = ComboBoxDefinition.create({ name: "123" });

    renderComponent({ fieldDefinition });

    const placeholder = i18n.t<string>("descriptionPlaceholder", {
      ns: "definition",
    });
    const field = await screen.findByPlaceholderText(placeholder);

    userEvent.clear(field);
    userEvent.type(field, "NewDescription");

    expect(fieldDefinition.description).toBe("NewDescription");
  });

  it("should change change kind", async () => {
    expect.hasAssertions();

    const fieldDefinition = ComboBoxDefinition.create({
      name: "123",
      change: "EveryFrame",
    });

    renderComponent({ fieldDefinition });

    const key = i18n.t<string>("frameChangesKey", { ns: "definition" });
    const field = await screen.findByText(key);

    userEvent.click(field);

    expect(fieldDefinition.change).toBe("FrameChanges");
  });

  it("should fire kind change after select", async () => {
    expect.hasAssertions();

    const fieldDefinition = ComboBoxDefinition.create({ name: "123" });
    const itemDefinition = ItemDefinition.create({
      name: "Item",
      fields: [fieldDefinition],
    });

    renderComponent({ fieldDefinition, itemDefinition });

    userEvent.click(await screen.findByText("ComboBox", { selector: "span" }));

    userEvent.click(await screen.findByText("CheckBox", { selector: "li" }));

    expect(itemDefinition.fields.at(0)?.kind).toBe("CheckBox");
  });
});
