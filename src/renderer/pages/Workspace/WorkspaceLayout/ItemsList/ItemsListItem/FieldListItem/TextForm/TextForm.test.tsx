import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SnapshotIn, types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { TextDefinition, TextField } from "renderer/models";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { TextForm } from "./TextForm";

type Props = ComponentProps<typeof TextForm>;

const Model = types.model({
  definition: TextDefinition,
  field: TextField,
});

const getInstance = ({
  definition,
  field,
}: {
  definition?: Partial<SnapshotIn<typeof TextDefinition>>;
  field?: Partial<SnapshotIn<typeof TextField>>;
} = {}) => {
  return Model.create({
    definition: {
      name: "Text",
      change: "EveryFrame",
      default: "Hello",
      description: "Description",
      id: "id",
      kind: "Text",
      ...definition,
    },
    field: {
      currentFrame: 1,
      definition: "id",
      id: "1",
      kind: "Text",
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
      <TextForm {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<TextForm />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    await expect(screen.findByLabelText("Text")).resolves.toBeInTheDocument();
  });

  it("should render error message", async () => {
    expect.hasAssertions();

    const instance = getInstance({
      field: { values: { "5": { value: "A" } } },
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
    userEvent.type(input, "world");

    expect(instance.field.current?.value).toBe("world");
  });
});
