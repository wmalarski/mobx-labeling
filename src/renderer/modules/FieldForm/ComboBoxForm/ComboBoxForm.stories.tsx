import { ComponentMeta, ComponentStory } from "@storybook/react";
import { types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { ComboBoxDefinition, ComboBoxField } from "renderer/models";
import { CurrentFrame } from "renderer/models/project/CurrentFrame";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { ComboBoxForm } from "./ComboBoxForm";

export default {
  title: "modules/FieldForm/ComboBoxForm",
  component: ComboBoxForm,
} as ComponentMeta<typeof ComboBoxForm>;

type Props = ComponentProps<typeof ComboBoxForm>;

const ComboBoxFormStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <ComboBoxForm {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof ComboBoxFormStory> = ComboBoxFormStory;

const Model = types.model({
  currentFrame: CurrentFrame,
  definition: ComboBoxDefinition,
  field: ComboBoxField,
});

const instance = Model.create({
  currentFrame: { id: "id" },
  definition: {
    id: "id",
    kind: "ComboBox",
    name: "ComboBox",
  },
  field: {
    currentFrame: "id",
    definition: "id",
    id: "1",
    kind: "ComboBox",
  },
});

export const Playground = Template.bind({});
Playground.args = { wrapperProps: {}, field: instance.field };
