import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SnapshotIn, types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { EyeDefinition, EyeField } from "renderer/models";
import { Tool } from "renderer/models/project/Tool";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { EyeForm } from "./EyeForm";

type Props = ComponentProps<typeof EyeForm>;

const Model = types.model({
  definition: EyeDefinition,
  field: EyeField,
  tool: Tool,
});

const getInstance = ({
  definition,
  field,
}: {
  definition?: Partial<SnapshotIn<typeof EyeDefinition>>;
  field?: Partial<SnapshotIn<typeof EyeField>>;
} = {}) => {
  return Model.create({
    tool: {
      kind: "Selector",
    },
    definition: {
      name: "Eye",
      id: "id",
      kind: "Eye",
      ...definition,
    },
    field: {
      currentFrame: 1,
      definition: "id",
      id: "1",
      kind: "Eye",
      values: { "1": { values: [0, 50, 50, 100, 100, 50, 50, 0] } },
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
      <EyeForm {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<EyeForm />", () => {
  it("should render error message", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      field: { values: {} },
    });

    renderComponent({ field: instance.field, tool: instance.tool });

    const header = i18n.t<string>("eyeDraw", { ns: "workspace" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();

    userEvent.click(await screen.findByText(header));
    expect(instance.tool.field?.id).toBe(instance.field.id);
  });

  it("should render and change values", async () => {
    expect.hasAssertions();

    const instance = getInstance();

    renderComponent({ field: instance.field });

    const label = i18n.t<string>("eyeX", { ns: "workspace", index: 0 });
    const field = await screen.findByLabelText(label);
    userEvent.clear(field);
    userEvent.type(field, "50");

    expect(instance.field.current?.values).toStrictEqual([
      50, 50, 50, 100, 100, 50, 50, 0,
    ]);
  });
});
