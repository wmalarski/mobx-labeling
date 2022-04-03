import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SnapshotIn, types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { CheckBoxDefinition, CheckBoxField } from "renderer/models";
import { CurrentFrame } from "renderer/models/project/CurrentFrame";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { CheckBoxForm } from "./CheckBoxForm";

type Props = ComponentProps<typeof CheckBoxForm>;

const Model = types.model({
  currentFrame: CurrentFrame,
  definition: CheckBoxDefinition,
  field: CheckBoxField,
});

const getInstance = ({
  definition,
  field,
}: {
  definition?: Partial<SnapshotIn<typeof CheckBoxDefinition>>;
  field?: Partial<SnapshotIn<typeof CheckBoxField>>;
} = {}) => {
  return Model.create({
    currentFrame: { id: "id" },
    definition: {
      change: "EveryFrame",
      id: "id",
      kind: "CheckBox",
      name: "CheckBox",
      ...definition,
    },
    field: {
      currentFrame: "id",
      definition: "id",
      id: "1",
      kind: "CheckBox",
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
      <CheckBoxForm {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<CheckBoxForm />", () => {
  it("should render error message", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      field: { values: { "5": { value: false } } },
    });

    renderComponent({ field: instance.field });

    const header = i18n.t<string>("invalidField", { ns: "workspace" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should change value", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      definition: { default: true },
    });

    renderComponent({
      field: instance.field,
    });

    userEvent.click(await screen.findByLabelText(instance.definition.name));

    expect(instance.field.current?.value).toBe(false);
  });
});
