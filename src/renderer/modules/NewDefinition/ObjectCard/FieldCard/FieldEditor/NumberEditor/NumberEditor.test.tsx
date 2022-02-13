import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { NumberDefinition } from "renderer/models/fields/number";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { NumberEditor } from "./NumberEditor";

type Props = ComponentProps<typeof NumberEditor>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    fieldDefinition: NumberDefinition.create({
      name: "Name123",
    }),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <NumberEditor {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<NumberEditor />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    const header = i18n.t<string>("numberHeader", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should change min value", async () => {
    expect.hasAssertions();

    const fieldDefinition = NumberDefinition.create({ name: "123" });

    renderComponent({ fieldDefinition });

    const label = i18n.t<string>("numberMin", { ns: "definition" });

    const field = await screen.findByLabelText(label);
    userEvent.clear(field);
    userEvent.type(field, "12");

    expect(fieldDefinition.min).toBe(12);
  });

  it("should change max value", async () => {
    expect.hasAssertions();

    const fieldDefinition = NumberDefinition.create({ name: "123" });

    renderComponent({ fieldDefinition });

    const label = i18n.t<string>("numberMax", { ns: "definition" });

    const field = await screen.findByLabelText(label);
    userEvent.clear(field);
    userEvent.type(field, "12");

    expect(fieldDefinition.max).toBe(12);
  });

  it("should change step value", async () => {
    expect.hasAssertions();

    const fieldDefinition = NumberDefinition.create({ name: "123" });

    renderComponent({ fieldDefinition });

    const label = i18n.t<string>("numberStep", { ns: "definition" });

    const field = await screen.findByLabelText(label);
    userEvent.clear(field);
    userEvent.type(field, "12");

    expect(fieldDefinition.step).toBe(12);
  });

  it("should change default value", async () => {
    expect.hasAssertions();

    const fieldDefinition = NumberDefinition.create({ name: "123" });

    renderComponent({ fieldDefinition });

    const label = i18n.t<string>("numberDefault", { ns: "definition" });

    const field = await screen.findByLabelText(label);
    userEvent.clear(field);
    userEvent.type(field, "12");

    expect(fieldDefinition.default).toBe(12);
  });
});
