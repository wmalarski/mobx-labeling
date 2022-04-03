import { ComponentMeta, ComponentStory } from "@storybook/react";
import { types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { SelectDefinition, SelectField } from "renderer/models";
import { CurrentFrame } from "renderer/models/project/CurrentFrame";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { SelectForm } from "./SelectForm";

export default {
  title: "modules/FieldForm/SelectForm",
  component: SelectForm,
} as ComponentMeta<typeof SelectForm>;

type Props = ComponentProps<typeof SelectForm>;

const SelectFormStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <SelectForm {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof SelectFormStory> = SelectFormStory;

const Model = types.model({
  currentFrame: CurrentFrame,
  definition: SelectDefinition,
  field: SelectField,
});

const instance = Model.create({
  currentFrame: { id: "id" },
  definition: {
    id: "id",
    kind: "Select",
    name: "Text",
  },
  field: {
    currentFrame: "id",
    definition: "id",
    id: "1",
    kind: "Select",
    values: { "0": { value: "Sunny" } },
  },
});

export const Playground = Template.bind({});
Playground.args = { wrapperProps: {}, field: instance.field };
