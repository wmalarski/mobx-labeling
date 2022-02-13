import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { MultiSelectDefinition } from "renderer/models/fields/multiSelect";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { MultiSelectEditor } from "./MultiSelectEditor";

type Props = ComponentProps<typeof MultiSelectEditor>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    fieldDefinition: MultiSelectDefinition.create({
      name: "Name123",
    }),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <MultiSelectEditor {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<ComboBoxEditor />", () => {
  it("should render and change default", async () => {
    expect.hasAssertions();

    const fieldDefinition = MultiSelectDefinition.create({
      name: "Name123",
    });

    renderComponent({
      fieldDefinition,
    });

    userEvent.click(await screen.findByText("Left Lane"));

    expect(fieldDefinition.default).toStrictEqual(["Right Lane"]);
  });

  it("should render and add option after enter", async () => {
    expect.hasAssertions();

    const fieldDefinition = MultiSelectDefinition.create({
      name: "Name123",
    });

    renderComponent({
      fieldDefinition,
    });

    const placeholder = i18n.t<string>("multiSelectInput", {
      ns: "definition",
    });

    userEvent.type(await screen.findByLabelText(placeholder), "New{enter}");

    expect(
      fieldDefinition.options.map((option) => option.text).includes("New")
    ).toBeTruthy();
  });

  it("should render and add option by click", async () => {
    expect.hasAssertions();

    const fieldDefinition = MultiSelectDefinition.create({
      name: "Name123",
    });

    renderComponent({
      fieldDefinition,
    });

    const placeholder = i18n.t<string>("multiSelectInput", {
      ns: "definition",
    });
    const add = i18n.t<string>("multiSelectAddOption", {
      ns: "definition",
    });

    userEvent.type(await screen.findByLabelText(placeholder), "New");

    userEvent.click(await screen.findByText(add));

    expect(
      fieldDefinition.options.map((option) => option.text).includes("New")
    ).toBeTruthy();
  });

  it("should render and remove option", async () => {
    expect.hasAssertions();

    const fieldDefinition = MultiSelectDefinition.create({
      name: "Name123",
    });

    renderComponent({
      fieldDefinition,
    });

    const remove = i18n.t<string>("multiSelectRemoveOption", {
      ns: "definition",
    });

    userEvent.click((await screen.findAllByText(remove))[0]);

    expect(
      fieldDefinition.options.map((option) => option.text).includes("Car")
    ).toBeFalsy();
  });

  it("should render and change size", async () => {
    expect.hasAssertions();

    const fieldDefinition = MultiSelectDefinition.create({
      name: "Name123",
    });

    renderComponent({
      fieldDefinition,
    });

    const size = i18n.t<string>("multiSelectSize", { ns: "definition" });

    const sizeInput = (await screen.findAllByLabelText(size))[0];
    userEvent.clear(sizeInput);
    userEvent.type(sizeInput, "10");

    expect(fieldDefinition.options.at(0)?.size).toBe(10);
  });
});
