import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SnapshotIn, types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { Box3dDefinition, Box3dField, Tool } from "renderer/models";
import { CurrentFrame } from "renderer/models/project/CurrentFrame";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { Box3dForm } from "./Box3dForm";

type Props = ComponentProps<typeof Box3dForm>;

const Model = types.model({
  definition: Box3dDefinition,
  field: Box3dField,
  tool: Tool,
  currentFrame: CurrentFrame,
});

const getInstance = ({
  definition,
  field,
}: {
  definition?: Partial<SnapshotIn<typeof Box3dDefinition>>;
  field?: Partial<SnapshotIn<typeof Box3dField>>;
} = {}) => {
  return Model.create({
    currentFrame: { id: "id" },
    tool: {
      kind: "Selector",
    },
    definition: {
      name: "Box3d",
      id: "id",
      kind: "Box3d",
      ...definition,
    },
    field: {
      currentFrame: "id",
      definition: "id",
      id: "1",
      kind: "Box3d",
      values: {
        "1": {
          front: [0, 0, 0, 100, 100, 100, 100, 0],
          sideType: "None",
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
      <Box3dForm {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<Box3dForm />", () => {
  it("should render error message", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      field: { values: {} },
    });

    renderComponent({ field: instance.field, tool: instance.tool });

    const header = i18n.t<string>("box3dDraw", { ns: "workspace" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();

    userEvent.click(await screen.findByText(header));
    expect(instance.tool.field?.id).toBe(instance.field.id);
  });

  it("should render and change front values", async () => {
    expect.hasAssertions();

    const instance = getInstance();

    renderComponent({ field: instance.field });

    const label = i18n.t<string>("box3dX", { ns: "workspace", index: 0 });
    const field = await screen.findByLabelText(label);
    userEvent.clear(field);
    userEvent.type(field, "50");

    expect(instance.field.current?.front).toStrictEqual([
      50, 0, 0, 100, 100, 100, 100, 0,
    ]);
  });

  it("should render and change side values", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      field: {
        values: {
          "1": {
            front: [0, 0, 0, 100, 100, 100, 100, 0],
            side: [200, 0, 200, 100],
            sideType: "Right",
          },
        },
      },
    });

    renderComponent({ field: instance.field });

    const label = i18n.t<string>("box3dSideX", { ns: "workspace", index: 0 });
    const field = await screen.findByLabelText(label);
    userEvent.clear(field);
    userEvent.type(field, "50");

    expect(instance.field.current?.side).toStrictEqual([50, 0, 200, 100]);
  });

  it("should change side type value", async () => {
    expect.hasAssertions();

    const instance = getInstance();

    renderComponent({ field: instance.field });

    const none = i18n.t<string>("box3dNone", { ns: "workspace", index: 0 });
    const left = i18n.t<string>("box3dLeft", { ns: "workspace", index: 0 });
    const right = i18n.t<string>("box3dRight", { ns: "workspace", index: 0 });

    userEvent.click(await screen.findByText(none));
    userEvent.click(await screen.findByText(left));

    expect(instance.field.current?.sideType).toBe("Left");

    userEvent.click(await screen.findByText(left));
    userEvent.click(await screen.findByText(right));

    expect(instance.field.current?.sideType).toBe("Right");
  });
});
