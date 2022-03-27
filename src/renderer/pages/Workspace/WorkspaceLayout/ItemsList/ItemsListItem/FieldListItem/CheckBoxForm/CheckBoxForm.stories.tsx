import { ComponentMeta, ComponentStory } from "@storybook/react";
import { types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { CheckBoxDefinition, CheckBoxField } from "renderer/models";
import { CurrentFrame } from "renderer/models/project/CurrentFrame";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { CheckBoxForm } from "./CheckBoxForm";

export default {
  title:
    "pages/Workspace/WorkspaceLayout/ItemsList/ItemsListItem/FieldListItem/CheckBoxForm",
  component: CheckBoxForm,
} as ComponentMeta<typeof CheckBoxForm>;

type Props = ComponentProps<typeof CheckBoxForm>;

const CheckBoxFormStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <CheckBoxForm {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof CheckBoxFormStory> = CheckBoxFormStory;

const Model = types.model({
  definition: CheckBoxDefinition,
  field: CheckBoxField,
  currentFrame: CurrentFrame,
});

const instance = Model.create({
  currentFrame: { id: "id" },
  definition: {
    name: "CheckBox",
    id: "id",
    kind: "CheckBox",
  },
  field: {
    currentFrame: "id",
    definition: "id",
    id: "1",
    kind: "CheckBox",
  },
});

export const Playground = Template.bind({});
Playground.args = { wrapperProps: {}, field: instance.field };
