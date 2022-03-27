import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SnapshotIn, types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { LineDefinition, LineField, Tool } from "renderer/models";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { LineForm } from "./LineForm";

type Props = ComponentProps<typeof LineForm>;

const Model = types.model({
  definition: LineDefinition,
  field: LineField,
  tool: Tool,
});

const getInstance = ({
  definition,
  field,
}: {
  definition?: Partial<SnapshotIn<typeof LineDefinition>>;
  field?: Partial<SnapshotIn<typeof LineField>>;
} = {}) => {
  return Model.create({
    tool: {
      kind: "Selector",
    },
    definition: {
      name: "Line",
      id: "id",
      kind: "Line",
      ...definition,
    },
    field: {
      currentFrame: 1,
      definition: "id",
      id: "1",
      kind: "Line",
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
      <LineForm {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<LineForm />", () => {
  it("should render error message", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      field: { values: {} },
    });

    renderComponent({ field: instance.field, tool: instance.tool });

    const header = i18n.t<string>("lineDraw", { ns: "workspace" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();

    userEvent.click(await screen.findByText(header));
    expect(instance.tool.field?.id).toBe(instance.field.id);
  });

  it("should render and change values", async () => {
    expect.hasAssertions();

    const instance = getInstance();

    renderComponent({ field: instance.field });

    const label = i18n.t<string>("lineX", { ns: "workspace", index: 0 });
    const field = await screen.findByLabelText(label);
    userEvent.clear(field);
    userEvent.type(field, "50");

    expect(instance.field.current?.values).toStrictEqual([50, 0, 100, 100]);
  });

  it("should add new point to start", async () => {
    expect.hasAssertions();

    const instance = getInstance();

    renderComponent({ field: instance.field });

    const label = i18n.t<string>("lineAdd", { ns: "workspace", index: 0 });
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

    const label = i18n.t<string>("lineRemove", {
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

    const label = i18n.t<string>("lineUp", { ns: "workspace", index: 1 });
    const button = await screen.findByLabelText(label);
    userEvent.click(button);

    expect(instance.field.current?.values).toStrictEqual([100, 100, 0, 0]);
  });

  it("should move down first point", async () => {
    expect.hasAssertions();

    const instance = getInstance();

    renderComponent({ field: instance.field });

    const label = i18n.t<string>("lineDown", { ns: "workspace", index: 0 });
    const button = await screen.findByLabelText(label);
    userEvent.click(button);

    expect(instance.field.current?.values).toStrictEqual([100, 100, 0, 0]);
  });
});
