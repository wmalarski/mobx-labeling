import { ComponentMeta, ComponentStory } from "@storybook/react";
import { types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { PointDefinition, PointField, Tool } from "renderer/models";
import { CurrentFrame } from "renderer/models/project/CurrentFrame";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { PointForm } from "./PointForm";

export default {
  title:
    "pages/Workspace/WorkspaceLayout/ItemsList/ItemsListItem/FieldListItem/PointForm",
  component: PointForm,
} as ComponentMeta<typeof PointForm>;

type Props = ComponentProps<typeof PointForm>;

const PointFormStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <PointForm {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof PointFormStory> = PointFormStory;

const Model = types.model({
  definition: PointDefinition,
  field: PointField,
  tool: Tool,
  currentFrame: CurrentFrame,
});

const instance = Model.create({
  currentFrame: { id: "id" },
  tool: {
    kind: "Selector",
  },
  definition: {
    name: "Point",
    id: "id",
    kind: "Point",
  },
  field: {
    currentFrame: "id",
    definition: "id",
    id: "1",
    kind: "Point",
    values: { "0": { value: [0, 0] } },
  },
});

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  field: instance.field,
  tool: instance.tool,
};
