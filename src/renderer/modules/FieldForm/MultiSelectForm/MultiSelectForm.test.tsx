import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SnapshotIn, types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { MultiSelectDefinition, MultiSelectField } from "renderer/models";
import { CurrentFrame } from "renderer/models/project/CurrentFrame";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { MultiSelectForm } from "./MultiSelectForm";

type Props = ComponentProps<typeof MultiSelectForm>;

const Model = types.model({
  currentFrame: CurrentFrame,
  definition: MultiSelectDefinition,
  field: MultiSelectField,
});

const getInstance = ({
  definition,
  field,
}: {
  definition?: Partial<SnapshotIn<typeof MultiSelectDefinition>>;
  field?: Partial<SnapshotIn<typeof MultiSelectField>>;
} = {}) => {
  return Model.create({
    currentFrame: { id: "id" },
    definition: {
      change: "EveryFrame",
      id: "id",
      kind: "MultiSelect",
      name: "MultiSelect",
      ...definition,
    },
    field: {
      currentFrame: "id",
      definition: "id",
      id: "1",
      kind: "MultiSelect",
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
      <MultiSelectForm {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<MultiSelectForm />", () => {
  it("should render error message", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      field: { values: { "5": { values: [] } } },
    });

    renderComponent({ field: instance.field });

    const header = i18n.t<string>("invalidField", { ns: "workspace" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should change value", async () => {
    expect.hasAssertions();

    const instance = getInstance();
    const current = instance.field.current?.values;
    const option = instance.definition.options[1].text;

    renderComponent({
      field: instance.field,
    });

    expect(instance.field.current?.values).toStrictEqual([
      current?.[0],
      current?.[1],
    ]);

    const input = await screen.findByText(option);
    userEvent.click(input);

    expect(instance.field.current?.values).toStrictEqual([current?.[0]]);
  });
});
