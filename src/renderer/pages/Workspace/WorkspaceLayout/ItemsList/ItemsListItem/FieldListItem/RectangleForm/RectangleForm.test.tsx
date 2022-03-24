import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SnapshotIn, types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { RectangleDefinition, RectangleField } from "renderer/models";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { RectangleForm } from "./RectangleForm";

type Props = ComponentProps<typeof RectangleForm>;

const Model = types.model({
  definition: RectangleDefinition,
  field: RectangleField,
});

const getInstance = ({
  definition,
  field,
}: {
  definition?: Partial<SnapshotIn<typeof RectangleDefinition>>;
  field?: Partial<SnapshotIn<typeof RectangleField>>;
} = {}) => {
  return Model.create({
    definition: {
      name: "Rectangle",
      id: "id",
      kind: "Rectangle",
      ...definition,
    },
    field: {
      currentFrame: 1,
      definition: "id",
      id: "1",
      kind: "Rectangle",
      values: { "1": { value: [0, 0, 100, 100] } },
      ...field,
    },
  });
};

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    field: getInstance().field,
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <RectangleForm {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<RectangleForm />", () => {
  it("should render error message", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      field: { values: {} },
    });

    renderComponent({ field: instance.field });

    const header = i18n.t<string>("invalidField", { ns: "workspace" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should change top value", async () => {
    expect.hasAssertions();

    const instance = getInstance();

    renderComponent({ field: instance.field });

    const label = i18n.t<string>("rectangleTop", { ns: "workspace" });
    const input = await screen.findByLabelText(label);

    userEvent.clear(input);
    userEvent.type(input, "44");

    expect(instance.field.current?.value[0]).toBe(44);
  });
});
