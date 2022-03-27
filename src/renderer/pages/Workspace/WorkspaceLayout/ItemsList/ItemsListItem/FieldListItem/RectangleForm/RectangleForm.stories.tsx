import { ComponentMeta, ComponentStory } from "@storybook/react";
import { types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { RectangleDefinition, RectangleField } from "renderer/models";
import { Tool } from "renderer/models/project/Tool";
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
});

const instance = Model.create({
  tool: {
    kind: "Selector",
  },
  definition: {
    name: "Rectangle",
    id: "id",
    kind: "Rectangle",
  },
  field: {
    currentFrame: 1,
    definition: "id",
    id: "1",
    kind: "Rectangle",
    values: { "1": { value: [0, 0, 100, 100] } },
  },
});

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  field: instance.field,
  tool: instance.tool,
};
