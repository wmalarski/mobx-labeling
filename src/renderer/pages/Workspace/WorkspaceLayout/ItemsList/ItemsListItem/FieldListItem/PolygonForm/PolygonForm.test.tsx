import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SnapshotIn, types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { PolygonDefinition, PolygonField, Tool } from "renderer/models";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { PolygonForm } from "./PolygonForm";

type Props = ComponentProps<typeof PolygonForm>;

const Model = types.model({
  definition: PolygonDefinition,
  field: PolygonField,
  tool: Tool,
});

const getInstance = ({
  definition,
  field,
}: {
  definition?: Partial<SnapshotIn<typeof PolygonDefinition>>;
  field?: Partial<SnapshotIn<typeof PolygonField>>;
} = {}) => {
  return Model.create({
    tool: {
      kind: "Selector",
    },
    definition: {
      name: "Polygon",
      id: "id",
      kind: "Polygon",
      ...definition,
    },
    field: {
      currentFrame: 1,
      definition: "id",
      id: "1",
      kind: "Polygon",
      values: { "1": { values: [0, 0, 100, 100] } },
      ...field,
    },
  });
};

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const instance = getInstance();
  const defaultProps: Props = {
    field: instance.field,
    tool: instance.tool,
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <PolygonForm {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<PolygonForm />", () => {
  it("should render error message", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      field: { values: {} },
    });

    renderComponent({ field: instance.field, tool: instance.tool });

    const header = i18n.t<string>("polygonDraw", { ns: "workspace" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();

    userEvent.click(await screen.findByText(header));
    expect(instance.tool.field?.id).toBe(instance.field.id);
  });

  it("should render and change values", async () => {
    expect.hasAssertions();

    const instance = getInstance();

    renderComponent({ field: instance.field });

    const label = i18n.t<string>("polygonX", { ns: "workspace", index: 0 });
    const field = await screen.findByLabelText(label);
    userEvent.clear(field);
    userEvent.type(field, "50");

    expect(instance.field.current?.values).toStrictEqual([50, 0, 100, 100]);
  });

  it("should add new point to start", async () => {
    expect.hasAssertions();

    const instance = getInstance();

    renderComponent({ field: instance.field });

    const label = i18n.t<string>("polygonAdd", { ns: "workspace", index: 0 });
    const button = await screen.findByText(label);
    userEvent.click(button);

    expect(instance.field.current?.values).toStrictEqual([
      0, 0, 0, 0, 100, 100,
    ]);
  });

  it("should remove first point", async () => {
    expect.hasAssertions();

    const instance = getInstance();

    renderComponent({ field: instance.field });

    const label = i18n.t<string>("polygonRemove", {
      ns: "workspace",
      index: 0,
    });
    const button = await screen.findByLabelText(label);
    userEvent.click(button);

    expect(instance.field.current?.values).toStrictEqual([100, 100]);
  });

  it("should move up second point", async () => {
    expect.hasAssertions();

    const instance = getInstance();

    renderComponent({ field: instance.field });

    const label = i18n.t<string>("polygonUp", { ns: "workspace", index: 1 });
    const button = await screen.findByLabelText(label);
    userEvent.click(button);

    expect(instance.field.current?.values).toStrictEqual([100, 100, 0, 0]);
  });

  it("should move down first point", async () => {
    expect.hasAssertions();

    const instance = getInstance();

    renderComponent({ field: instance.field });

    const label = i18n.t<string>("polygonDown", { ns: "workspace", index: 0 });
    const button = await screen.findByLabelText(label);
    userEvent.click(button);

    expect(instance.field.current?.values).toStrictEqual([100, 100, 0, 0]);
  });
});
