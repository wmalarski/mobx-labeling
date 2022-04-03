import { ComponentMeta, ComponentStory } from "@storybook/react";
import { types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { EyeDefinition, EyeField, Tool } from "renderer/models";
import { CurrentFrame } from "renderer/models/project/CurrentFrame";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { EyeForm } from "./EyeForm";

export default {
  title:
    "pages/Workspace/WorkspaceLayout/ItemsList/ItemsListItem/FieldListItem/EyeForm",
  component: EyeForm,
} as ComponentMeta<typeof EyeForm>;

type Props = ComponentProps<typeof EyeForm>;

const EyeFormStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <EyeForm {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof EyeFormStory> = EyeFormStory;

const Model = types.model({
  currentFrame: CurrentFrame,
  definition: EyeDefinition,
  field: EyeField,
  tool: Tool,
});

const instance = Model.create({
  currentFrame: { id: "id" },
  tool: {
    kind: "Selector",
  },
  definition: {
    id: "id",
    kind: "Eye",
    name: "Eye",
  },
  field: {
    currentFrame: "id",
    definition: "id",
    id: "1",
    kind: "Eye",
    values: { "0": { values: [0, 0, 100, 100, 0, 100, 100, 0] } },
  },
});

export const Playground = Template.bind({});
Playground.args = {
  field: instance.field,
  tool: instance.tool,
  wrapperProps: {},
};
