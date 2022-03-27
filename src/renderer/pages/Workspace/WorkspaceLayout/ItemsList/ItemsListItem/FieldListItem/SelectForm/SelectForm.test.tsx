import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SnapshotIn, types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { SelectDefinition, SelectField } from "renderer/models";
import { CurrentFrame } from "renderer/models/project/CurrentFrame";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { SelectForm } from "./SelectForm";

type Props = ComponentProps<typeof SelectForm>;

const Model = types.model({
  definition: SelectDefinition,
  field: SelectField,
  currentFrame: CurrentFrame,
});

const getInstance = ({
  definition,
  field,
}: {
  definition?: Partial<SnapshotIn<typeof SelectDefinition>>;
  field?: Partial<SnapshotIn<typeof SelectField>>;
} = {}) => {
  return Model.create({
    currentFrame: { id: "id" },
    definition: {
      name: "Text",
      change: "EveryFrame",
      id: "id",
      kind: "Select",
      ...definition,
    },
    field: {
      currentFrame: "id",
      definition: "id",
      id: "1",
      kind: "Select",
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
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <SelectForm {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<SelectForm />", () => {
  it("should render error message", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      field: { values: { "5": { value: "A" } } },
    });

    renderComponent({ field: instance.field });

    const header = i18n.t<string>("invalidField", { ns: "workspace" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should change value", async () => {
    expect.hasAssertions();

    const instance = getInstance();
    const option = instance.definition.options[1].text;

    renderComponent({
      field: instance.field,
    });

    const input = await screen.findByText(option);
    userEvent.click(input);

    expect(instance.field.current?.value).toBe(option);
  });
});
