import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { SnapshotIn, types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { Field, FieldDefinition, Tool } from "renderer/models";
import { CurrentFrame } from "renderer/models/project/CurrentFrame";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { FieldListItem } from "./FieldListItem";

type Props = ComponentProps<typeof FieldListItem>;

const Model = types.model({
  definition: FieldDefinition,
  field: Field,
  tool: Tool,
  currentFrame: CurrentFrame,
});

const getInstance = ({
  definition,
  field,
}: {
  definition: SnapshotIn<typeof FieldDefinition>;
  field: SnapshotIn<typeof Field>;
}) => {
  return Model.create({
    currentFrame: { id: "id" },
    tool: { kind: "Selector" },
    definition,
    field,
  });
};

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const instance = getInstance({
    definition: { name: "Box3d", id: "id", kind: "Box3d" },
    field: {
      currentFrame: "id",
      definition: "id",
      id: "1",
      kind: "Box3d",
      values: {
        "0": {
          front: [0, 0, 0, 100, 100, 100, 100, 0],
          sideType: "None",
        },
      },
    },
  });
  const defaultProps: Props = {
    field: instance.field,
    tool: instance.tool,
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <FieldListItem {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<FieldListItem />", () => {
  it("should render Box3d", async () => {
    expect.hasAssertions();

    renderComponent();

    const header = i18n.t<string>("box3dPlaceholder", { ns: "workspace" });
    await expect(screen.findByLabelText(header)).resolves.toBeInTheDocument();
  });

  it("should render CheckBox", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      definition: { name: "CheckBox", id: "id", kind: "CheckBox" },
      field: {
        currentFrame: "id",
        definition: "id",
        id: "1",
        kind: "CheckBox",
        values: { "0": { value: false } },
      },
    });

    renderComponent({ field: instance.field, tool: instance.tool });

    await expect(
      screen.findByLabelText("CheckBox")
    ).resolves.toBeInTheDocument();
  });

  it("should render ComboBox", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      definition: { name: "ComboBox", id: "id", kind: "ComboBox" },
      field: {
        currentFrame: "id",
        definition: "id",
        id: "1",
        kind: "ComboBox",
        values: { "0": { value: "Car" } },
      },
    });

    renderComponent({ field: instance.field, tool: instance.tool });

    await expect(
      screen.findByLabelText("ComboBox")
    ).resolves.toBeInTheDocument();
  });

  it("should render Eye", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      definition: { name: "Eye", id: "id", kind: "Eye" },
      field: {
        currentFrame: "id",
        definition: "id",
        id: "1",
        kind: "Eye",
        values: { "0": { values: [0, 50, 50, 100, 100, 50, 50, 0] } },
      },
    });

    renderComponent({ field: instance.field, tool: instance.tool });

    const label = i18n.t<string>("eyeX", { ns: "workspace", index: 0 });
    await expect(screen.findByLabelText(label)).resolves.toBeInTheDocument();
  });

  it("should render Graph", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      definition: { name: "Graph", id: "id", kind: "Graph" },
      field: {
        currentFrame: "id",
        definition: "id",
        id: "1",
        kind: "Graph",
        values: {
          "0": {
            edges: [{ from: 0, to: 1 }],
            points: [
              { x: 0, y: 0 },
              { x: 10, y: 100 },
            ],
          },
        },
      },
    });

    renderComponent({ field: instance.field, tool: instance.tool });

    const label = i18n.t<string>("graphX", { ns: "workspace", index: 0 });
    await expect(screen.findByLabelText(label)).resolves.toBeInTheDocument();
  });

  it("should render Line", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      definition: { name: "Line", id: "id", kind: "Line" },
      field: {
        currentFrame: "id",
        definition: "id",
        id: "1",
        kind: "Line",
        values: { "0": { values: [0, 0, 100, 100] } },
      },
    });

    renderComponent({ field: instance.field, tool: instance.tool });

    const label = i18n.t<string>("lineX", { ns: "workspace", index: 0 });
    await expect(screen.findByLabelText(label)).resolves.toBeInTheDocument();
  });

  it("should render MultiSelect", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      definition: { name: "MultiSelect", id: "id", kind: "MultiSelect" },
      field: {
        currentFrame: "id",
        definition: "id",
        id: "1",
        kind: "MultiSelect",
      },
    });

    renderComponent({ field: instance.field, tool: instance.tool });

    await expect(screen.findByText("Left Lane")).resolves.toBeInTheDocument();
  });

  it("should render Number", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      definition: { name: "Number", id: "id", kind: "Number" },
      field: {
        currentFrame: "id",
        definition: "id",
        id: "1",
        kind: "Number",
      },
    });

    renderComponent({ field: instance.field, tool: instance.tool });

    await expect(screen.findByLabelText("Number")).resolves.toBeInTheDocument();
  });

  it("should render Point", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      definition: { name: "Point", id: "id", kind: "Point" },
      field: {
        currentFrame: "id",
        definition: "id",
        id: "1",
        kind: "Point",
        values: { "0": { value: [0, 0] } },
      },
    });

    renderComponent({ field: instance.field, tool: instance.tool });

    const label = i18n.t<string>("pointX", { ns: "workspace" });
    await expect(screen.findByLabelText(label)).resolves.toBeInTheDocument();
  });

  it("should render Polygon", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      definition: { name: "Polygon", id: "id", kind: "Polygon" },
      field: {
        currentFrame: "id",
        definition: "id",
        id: "1",
        kind: "Polygon",
        values: { "0": { values: [0, 0, 100, 100] } },
      },
    });

    renderComponent({ field: instance.field, tool: instance.tool });

    const label = i18n.t<string>("polygonX", { ns: "workspace", index: 0 });
    await expect(screen.findByLabelText(label)).resolves.toBeInTheDocument();
  });

  it("should render Rectangle", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      definition: { name: "Rectangle", id: "id", kind: "Rectangle" },
      field: {
        currentFrame: "id",
        definition: "id",
        id: "1",
        kind: "Rectangle",
        values: { "0": { value: [0, 0, 100, 100] } },
      },
    });

    renderComponent({ field: instance.field, tool: instance.tool });

    const label = i18n.t<string>("rectangleTop", { ns: "workspace" });
    await expect(screen.findByLabelText(label)).resolves.toBeInTheDocument();
  });

  it("should render Select", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      definition: { name: "Select", id: "id", kind: "Select" },
      field: {
        currentFrame: "id",
        definition: "id",
        id: "1",
        kind: "Select",
      },
    });

    renderComponent({ field: instance.field, tool: instance.tool });

    await expect(screen.findByText("Snow")).resolves.toBeInTheDocument();
  });

  it("should render Text", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      definition: { name: "Text", id: "id", kind: "Text" },
      field: {
        currentFrame: "id",
        definition: "id",
        id: "1",
        kind: "Text",
      },
    });

    renderComponent({ field: instance.field, tool: instance.tool });

    await expect(screen.findByLabelText("Text")).resolves.toBeInTheDocument();
  });
});
