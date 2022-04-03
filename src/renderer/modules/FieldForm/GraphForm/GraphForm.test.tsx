import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SnapshotIn, types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { GraphDefinition, GraphField, Tool } from "renderer/models";
import { CurrentFrame } from "renderer/models/project/CurrentFrame";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { GraphForm } from "./GraphForm";

type Props = ComponentProps<typeof GraphForm>;

const Model = types.model({
  definition: GraphDefinition,
  field: GraphField,
  tool: Tool,
  currentFrame: CurrentFrame,
});

const getInstance = ({
  definition,
  field,
}: {
  definition?: Partial<SnapshotIn<typeof GraphDefinition>>;
  field?: Partial<SnapshotIn<typeof GraphField>>;
} = {}) => {
  return Model.create({
    currentFrame: { id: "id" },
    tool: {
      kind: "Selector",
    },
    definition: {
      id: "id",
      kind: "Graph",
      name: "Graph",
      ...definition,
    },
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
      <GraphForm {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<GraphForm />", () => {
  it("should render error message", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      field: { values: {} },
    });

    renderComponent({ field: instance.field, tool: instance.tool });

    const header = i18n.t<string>("graphDraw", { ns: "workspace" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();

    userEvent.click(await screen.findByText(header));
    expect(instance.tool.field?.id).toBe(instance.field.id);
  });

  it("should render and change x", async () => {
    expect.hasAssertions();

    const instance = getInstance();

    renderComponent({ field: instance.field });

    const label = i18n.t<string>("graphX", { ns: "workspace", index: 0 });
    const field = await screen.findByLabelText(label);
    userEvent.clear(field);
    userEvent.type(field, "50");

    expect(instance.field.current?.points[0].x).toBe(50);
    await expect(screen.findByText(label)).resolves.toBeInTheDocument();
  });

  it("should render and change y", async () => {
    expect.hasAssertions();

    const instance = getInstance();

    renderComponent({ field: instance.field });

    const label = i18n.t<string>("graphY", { ns: "workspace", index: 0 });
    const field = await screen.findByLabelText(label);
    userEvent.clear(field);
    userEvent.type(field, "502");

    expect(instance.field.current?.points[0].y).toBe(502);
    await expect(screen.findByText(label)).resolves.toBeInTheDocument();
  });

  it("should add new point", async () => {
    expect.hasAssertions();

    const instance = getInstance();
    const points = instance.field.current?.points.length as number;

    renderComponent({ field: instance.field });

    const label = i18n.t<string>("graphAddPoint", { ns: "workspace" });
    const field = await screen.findByText(label);
    userEvent.click(field);

    expect(instance.field.current?.points).toHaveLength(points + 1);
    await expect(screen.findByText(label)).resolves.toBeInTheDocument();
  });

  it("should add new edge", async () => {
    expect.hasAssertions();

    const instance = getInstance();
    const edges = instance.field.current?.edges.length as number;

    renderComponent({ field: instance.field });

    const label = i18n.t<string>("graphAddEdge", { ns: "workspace" });
    const field = await screen.findByText(label);
    userEvent.click(field);

    expect(instance.field.current?.edges).toHaveLength(edges + 1);
    await expect(screen.findByText(label)).resolves.toBeInTheDocument();
  });

  it("should remove point", async () => {
    expect.hasAssertions();

    const instance = getInstance();
    const points = instance.field.current?.points.length as number;

    renderComponent({ field: instance.field });

    const label = i18n.t<string>("graphRemovePoint", {
      ns: "workspace",
      index: 1,
    });
    const field = await screen.findByLabelText(label);
    userEvent.click(field);

    expect(instance.field.current?.points).toHaveLength(points - 1);
    await expect(
      screen.findByText(i18n.t<string>("graphAddPoint", { ns: "workspace" }))
    ).resolves.toBeInTheDocument();
  });

  it("should remove edge", async () => {
    expect.hasAssertions();

    const instance = getInstance();
    const points = instance.field.current?.edges.length as number;

    renderComponent({ field: instance.field });

    const label = i18n.t<string>("graphRemoveEdge", {
      ns: "workspace",
      index: 0,
    });
    const field = await screen.findByLabelText(label);
    userEvent.click(field);

    expect(instance.field.current?.edges).toHaveLength(points - 1);
    await expect(
      screen.findByText(i18n.t<string>("graphAddPoint", { ns: "workspace" }))
    ).resolves.toBeInTheDocument();
  });

  it("should change from value", async () => {
    expect.hasAssertions();

    const instance = getInstance();

    renderComponent({ field: instance.field });

    userEvent.click(await screen.findByText("0"));
    userEvent.click((await screen.findAllByText("1"))[0]);

    expect(instance.field.current?.edges[0].from).toBe(1);
    await expect(
      screen.findByText(i18n.t<string>("graphAddPoint", { ns: "workspace" }))
    ).resolves.toBeInTheDocument();
  });

  it("should change to value", async () => {
    expect.hasAssertions();

    const instance = getInstance();

    renderComponent({ field: instance.field });

    userEvent.click(await screen.findByText("1"));
    userEvent.click((await screen.findAllByText("0"))[0]);

    expect(instance.field.current?.edges[0].to).toBe(0);
    await expect(
      screen.findByText(i18n.t<string>("graphAddPoint", { ns: "workspace" }))
    ).resolves.toBeInTheDocument();
  });
});
