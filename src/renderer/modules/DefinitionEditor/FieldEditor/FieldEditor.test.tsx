import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import {
  Box3dDefinition,
  CheckBoxDefinition,
  ComboBoxDefinition,
  EyeDefinition,
  GraphDefinition,
  LineDefinition,
  MultiSelectDefinition,
  NumberDefinition,
  PointDefinition,
  PolygonDefinition,
  RectangleDefinition,
  SelectDefinition,
  TextDefinition,
} from "renderer/models";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { FieldEditor } from "./FieldEditor";

const name = "Name123";

type Props = ComponentProps<typeof FieldEditor>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    fieldDefinition: Box3dDefinition.create({ name: "123" }),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <FieldEditor {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<FieldEditor />", () => {
  it("should render CheckBoxDefinition", async () => {
    expect.hasAssertions();

    renderComponent({ fieldDefinition: CheckBoxDefinition.create({ name }) });

    const header = i18n.t<string>("checkboxHeader", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should render ComboBoxDefinition", async () => {
    expect.hasAssertions();

    renderComponent({ fieldDefinition: ComboBoxDefinition.create({ name }) });

    const header = i18n.t<string>("comboBoxHeader", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should render MultiSelectDefinition", async () => {
    expect.hasAssertions();

    renderComponent({
      fieldDefinition: MultiSelectDefinition.create({ name }),
    });

    const header = i18n.t<string>("multiSelectHeader", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should render NumberDefinition", async () => {
    expect.hasAssertions();

    renderComponent({ fieldDefinition: NumberDefinition.create({ name }) });

    const header = i18n.t<string>("numberHeader", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should render SelectDefinition", async () => {
    expect.hasAssertions();

    renderComponent({ fieldDefinition: SelectDefinition.create({ name }) });

    const header = i18n.t<string>("selectHeader", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should render TextDefinition", async () => {
    expect.hasAssertions();

    renderComponent({ fieldDefinition: TextDefinition.create({ name }) });

    const header = i18n.t<string>("textHeader", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should render Box3dDefinition", async () => {
    expect.hasAssertions();

    renderComponent({ fieldDefinition: Box3dDefinition.create({ name }) });

    const header = i18n.t<string>("figureHeader", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should render EyeDefinition", async () => {
    expect.hasAssertions();

    renderComponent({ fieldDefinition: EyeDefinition.create({ name }) });

    const header = i18n.t<string>("figureHeader", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should render GraphDefinition", async () => {
    expect.hasAssertions();

    renderComponent({ fieldDefinition: GraphDefinition.create({ name }) });

    const header = i18n.t<string>("figureHeader", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should render LineDefinition", async () => {
    expect.hasAssertions();

    renderComponent({ fieldDefinition: LineDefinition.create({ name }) });

    const header = i18n.t<string>("figureHeader", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should render PointDefinition", async () => {
    expect.hasAssertions();

    renderComponent({ fieldDefinition: PointDefinition.create({ name }) });

    const header = i18n.t<string>("figureHeader", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should render PolygonDefinition", async () => {
    expect.hasAssertions();

    renderComponent({ fieldDefinition: PolygonDefinition.create({ name }) });

    const header = i18n.t<string>("figureHeader", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should render RectangleDefinition", async () => {
    expect.hasAssertions();

    renderComponent({ fieldDefinition: RectangleDefinition.create({ name }) });

    const header = i18n.t<string>("figureHeader", { ns: "definition" });

    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });
});
