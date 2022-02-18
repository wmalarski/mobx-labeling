import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { SelectDefinition } from "renderer/models";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { SelectEditor } from "./SelectEditor";

type Props = ComponentProps<typeof SelectEditor>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    fieldDefinition: SelectDefinition.create({
      name: "Name123",
    }),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <SelectEditor {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<SelectEditor />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    const header = i18n.t<string>("selectHeader", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should render and change default", async () => {
    expect.hasAssertions();

    const fieldDefinition = SelectDefinition.create({
      name: "Name123",
    });

    renderComponent({
      fieldDefinition,
    });

    userEvent.click(await screen.findByText("Rain"));

    expect(fieldDefinition.default).toBe("Rain");
  });

  it("should render and add option after enter", async () => {
    expect.hasAssertions();

    const fieldDefinition = SelectDefinition.create({
      name: "Name123",
    });

    renderComponent({
      fieldDefinition,
    });

    const placeholder = i18n.t<string>("selectInput", { ns: "definition" });

    userEvent.type(await screen.findByLabelText(placeholder), "New{enter}");

    expect(
      fieldDefinition.options.map((option) => option.text).includes("New")
    ).toBeTruthy();
  });

  it("should render and add option by click", async () => {
    expect.hasAssertions();

    const fieldDefinition = SelectDefinition.create({
      name: "Name123",
    });

    renderComponent({
      fieldDefinition,
    });

    const placeholder = i18n.t<string>("selectInput", { ns: "definition" });
    const add = i18n.t<string>("selectAddOption", { ns: "definition" });

    userEvent.type(await screen.findByLabelText(placeholder), "New");

    userEvent.click(await screen.findByText(add));

    expect(
      fieldDefinition.options.map((option) => option.text).includes("New")
    ).toBeTruthy();
  });

  it("should render and remove option", async () => {
    expect.hasAssertions();

    const fieldDefinition = SelectDefinition.create({
      name: "Name123",
    });

    renderComponent({
      fieldDefinition,
    });

    const remove = i18n.t<string>("selectRemoveOption", {
      ns: "definition",
    });

    userEvent.click((await screen.findAllByText(remove))[0]);

    expect(
      fieldDefinition.options.map((option) => option.text).includes("Sunny")
    ).toBeFalsy();
  });

  it("should render and change size", async () => {
    expect.hasAssertions();

    const fieldDefinition = SelectDefinition.create({
      name: "Name123",
    });

    renderComponent({
      fieldDefinition,
    });

    const size = i18n.t<string>("selectSize", { ns: "definition" });

    const sizeInput = (await screen.findAllByLabelText(size))[0];
    userEvent.clear(sizeInput);
    userEvent.type(sizeInput, "10");

    expect(fieldDefinition.options.at(0)?.size).toBe(10);
  });
});
