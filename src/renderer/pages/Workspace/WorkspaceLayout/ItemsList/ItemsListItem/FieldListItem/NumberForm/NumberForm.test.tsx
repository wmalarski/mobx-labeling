import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SnapshotIn, types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { NumberDefinition, NumberField } from "renderer/models";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { NumberForm } from "./NumberForm";

type Props = ComponentProps<typeof NumberForm>;

const Model = types.model({
  definition: NumberDefinition,
  field: NumberField,
});

const getInstance = ({
  definition,
  field,
}: {
  definition?: Partial<SnapshotIn<typeof NumberDefinition>>;
  field?: Partial<SnapshotIn<typeof NumberField>>;
} = {}) => {
  return Model.create({
    definition: {
      name: "Number",
      change: "EveryFrame",
      kind: "Number",
      id: "id",
      ...definition,
    },
    field: {
      currentFrame: 1,
      definition: "id",
      id: "1",
      kind: "Number",
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
      <NumberForm {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<NumberForm />", () => {
  it("should render error message", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      field: { values: { "5": { value: 5 } } },
    });

    renderComponent({
      field: instance.field,
    });

    const header = i18n.t<string>("invalidField", { ns: "workspace" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should change value", async () => {
    expect.hasAssertions();

    const instance = getInstance();

    renderComponent({
      field: instance.field,
    });

    const input = await screen.findByLabelText(instance.definition.name);
    userEvent.clear(input);
    userEvent.type(input, "2");

    expect(instance.field.current?.value).toBe(2);
  });
});
