import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SnapshotIn, types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { PointDefinition, PointField, Tool } from "renderer/models";
import { CurrentFrame } from "renderer/models/project/CurrentFrame";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { PointForm } from "./PointForm";

type Props = ComponentProps<typeof PointForm>;

const Model = types.model({
  definition: PointDefinition,
  field: PointField,
  tool: Tool,
  currentFrame: CurrentFrame,
});

const getInstance = ({
  definition,
  field,
}: {
  definition?: Partial<SnapshotIn<typeof PointDefinition>>;
  field?: Partial<SnapshotIn<typeof PointField>>;
} = {}) => {
  return Model.create({
    currentFrame: { id: "id" },
    tool: {
      kind: "Selector",
    },
    definition: {
      name: "Point",
      id: "id",
      kind: "Point",
      ...definition,
    },
    field: {
      currentFrame: "id",
      definition: "id",
      id: "1",
      kind: "Point",
      values: { "0": { value: [0, 0] } },
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
      <PointForm {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<PointForm />", () => {
  it("should render error message", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      field: { values: {} },
    });

    renderComponent({ field: instance.field, tool: instance.tool });

    const header = i18n.t<string>("pointDraw", { ns: "workspace" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();

    userEvent.click(await screen.findByText(header));
    expect(instance.tool.field?.id).toBe(instance.field.id);
  });

  it("should change X value", async () => {
    expect.hasAssertions();

    const instance = getInstance();

    renderComponent({ field: instance.field });

    const label = i18n.t<string>("pointX", { ns: "workspace" });
    const input = await screen.findByLabelText(label);

    userEvent.clear(input);
    userEvent.type(input, "44");

    expect(instance.field.current?.value[0]).toBe(44);
  });
});
