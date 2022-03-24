import { ComponentMeta, ComponentStory } from "@storybook/react";
import { types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { TextDefinition, TextField } from "renderer/models";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { TextForm } from "./TextForm";

export default {
  title:
    "pages/Workspace/WorkspaceLayout/ItemsList/ItemsListItem/FieldListItem/TextForm",
  component: TextForm,
} as ComponentMeta<typeof TextForm>;

type Props = ComponentProps<typeof TextForm>;

const TextFormStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <TextForm {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof TextFormStory> = TextFormStory;

const Model = types.model({
  definition: TextDefinition,
  field: TextField,
});

const instance = Model.create({
  definition: {
    name: "Text",
    change: "EveryFrame",
    default: "Hello",
    description: "Description",
    id: "id",
    kind: "Text",
  },
  field: {
    currentFrame: 1,
    definition: "id",
    id: "1",
    kind: "Text",
    values: { "1": { value: "hello" } },
  },
});

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  field: instance.field,
};
