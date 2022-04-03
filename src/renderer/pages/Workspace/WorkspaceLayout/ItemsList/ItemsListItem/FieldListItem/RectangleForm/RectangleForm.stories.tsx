import { ComponentMeta, ComponentStory } from "@storybook/react";
import { types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { RectangleDefinition, RectangleField, Tool } from "renderer/models";
import { CurrentFrame } from "renderer/models/project/CurrentFrame";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { RectangleForm } from "./RectangleForm";

export default {
  title:
    "pages/Workspace/WorkspaceLayout/ItemsList/ItemsListItem/FieldListItem/RectangleForm",
  component: RectangleForm,
} as ComponentMeta<typeof RectangleForm>;

type Props = ComponentProps<typeof RectangleForm>;

const RectangleFormStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <RectangleForm {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof RectangleFormStory> = RectangleFormStory;

const Model = types.model({
  definition: RectangleDefinition,
  field: RectangleField,
  tool: Tool,
  currentFrame: CurrentFrame,
});

const instance = Model.create({
  currentFrame: { id: "id" },
  tool: {
    kind: "Selector",
  },
  definition: {
    id: "id",
    kind: "Rectangle",
    name: "Rectangle",
  },
  field: {
    currentFrame: "id",
    definition: "id",
    id: "1",
    kind: "Rectangle",
    values: { "0": { value: [0, 0, 100, 100] } },
  },
});

export const Playground = Template.bind({});
Playground.args = {
  field: instance.field,
  tool: instance.tool,
  wrapperProps: {},
};
