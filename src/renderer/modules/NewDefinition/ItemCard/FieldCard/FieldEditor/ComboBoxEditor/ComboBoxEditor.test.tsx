import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { ComboBoxDefinition } from "renderer/models/fields/comboBox";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { ComboBoxEditor } from "./ComboBoxEditor";

type Props = ComponentProps<typeof ComboBoxEditor>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    fieldDefinition: ComboBoxDefinition.create({
      name: "Name123",
    }),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <ComboBoxEditor {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<ComboBoxEditor />", () => {
  it("should render and change default", async () => {
    expect.hasAssertions();

    const fieldDefinition = ComboBoxDefinition.create({
      name: "Name123",
    });

    renderComponent({
      fieldDefinition,
    });

    userEvent.click(await screen.findByText("Pedestrian"));

    expect(fieldDefinition.default).toBe("Pedestrian");
  });

  it("should render and add option after enter", async () => {
    expect.hasAssertions();

    const fieldDefinition = ComboBoxDefinition.create({
      name: "Name123",
    });

    renderComponent({
      fieldDefinition,
    });

    const placeholder = i18n.t<string>("comboBoxOptionPlaceholder", {
      ns: "definition",
    });

    userEvent.type(await screen.findByLabelText(placeholder), "New{enter}");

    expect(fieldDefinition.options.includes("New")).toBeTruthy();
  });

  it("should render and add option by click", async () => {
    expect.hasAssertions();

    const fieldDefinition = ComboBoxDefinition.create({
      name: "Name123",
    });

    renderComponent({
      fieldDefinition,
    });

    const placeholder = i18n.t<string>("comboBoxOptionPlaceholder", {
      ns: "definition",
    });
    const add = i18n.t<string>("comboBoAddOption", {
      ns: "definition",
    });

    userEvent.type(await screen.findByLabelText(placeholder), "New");

    userEvent.click(await screen.findByText(add));

    expect(fieldDefinition.options.includes("New")).toBeTruthy();
  });

  it("should render and remove option", async () => {
    expect.hasAssertions();

    const fieldDefinition = ComboBoxDefinition.create({
      name: "Name123",
    });

    renderComponent({
      fieldDefinition,
    });

    const remove = i18n.t<string>("comboBoxRemoveOption", {
      ns: "definition",
    });

    userEvent.click((await screen.findAllByText(remove))[0]);

    expect(fieldDefinition.options.includes("Car")).toBeFalsy();
  });
});
