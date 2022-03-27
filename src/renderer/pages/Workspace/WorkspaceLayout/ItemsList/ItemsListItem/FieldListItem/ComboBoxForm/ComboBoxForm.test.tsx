import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SnapshotIn, types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { ComboBoxDefinition, ComboBoxField } from "renderer/models";
import { CurrentFrame } from "renderer/models/project/CurrentFrame";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { ComboBoxForm } from "./ComboBoxForm";

type Props = ComponentProps<typeof ComboBoxForm>;

const Model = types.model({
  definition: ComboBoxDefinition,
  field: ComboBoxField,
  currentFrame: CurrentFrame,
});

const getInstance = ({
  definition,
  field,
}: {
  definition?: Partial<SnapshotIn<typeof ComboBoxDefinition>>;
  field?: Partial<SnapshotIn<typeof ComboBoxField>>;
} = {}) => {
  return Model.create({
    currentFrame: { id: "id" },
    definition: {
      name: "ComboBox",
      change: "EveryFrame",
      id: "id",
      kind: "ComboBox",
      ...definition,
    },
    field: {
      currentFrame: "id",
      definition: "id",
      id: "1",
      kind: "ComboBox",
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
      <ComboBoxForm {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<ComboBoxForm />", () => {
  it("should render error message", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      field: { values: { "5": { value: "s" } } },
    });

    renderComponent({ field: instance.field });

    const header = i18n.t<string>("invalidField", { ns: "workspace" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });

  it("should change value", async () => {
    expect.hasAssertions();

    const options = ["Car", "Pedestrian"];
    const instance = getInstance({
      definition: { default: options[0], options },
    });

    renderComponent({
      field: instance.field,
    });

    userEvent.click(await screen.findByText(options[0]));
    userEvent.click(await screen.findByText(options[1]));

    expect(instance.field.current?.value).toStrictEqual(options[1]);
  });
});
