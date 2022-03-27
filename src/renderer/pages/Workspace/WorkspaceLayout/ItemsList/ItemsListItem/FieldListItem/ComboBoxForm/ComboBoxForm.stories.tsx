import { ComponentMeta, ComponentStory } from "@storybook/react";
import { types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { ComboBoxDefinition, ComboBoxField } from "renderer/models";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { ComboBoxForm } from "./ComboBoxForm";

export default {
  title:
    "pages/Workspace/WorkspaceLayout/ItemsList/ItemsListItem/FieldListItem/ComboBoxForm",
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
  definition: ComboBoxDefinition,
  field: ComboBoxField,
});

const instance = Model.create({
  definition: {
    name: "ComboBox",
    id: "id",
    kind: "ComboBox",
  },
  field: {
    currentFrame: 1,
    definition: "id",
    id: "1",
    kind: "ComboBox",
  },
});

export const Playground = Template.bind({});
Playground.args = { wrapperProps: {}, field: instance.field };
