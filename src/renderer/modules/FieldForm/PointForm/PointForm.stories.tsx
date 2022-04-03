import { ComponentMeta, ComponentStory } from "@storybook/react";
import { types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { PointDefinition, PointField, Tool } from "renderer/models";
import { CurrentFrame } from "renderer/models/project/CurrentFrame";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { PointForm } from "./PointForm";

export default {
  title: "modules/FieldForm/PointForm",
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
  currentFrame: CurrentFrame,
  definition: PointDefinition,
  field: PointField,
  tool: Tool,
});

const instance = Model.create({
  currentFrame: { id: "id" },
  tool: {
    kind: "Selector",
  },
  definition: {
    id: "id",
    kind: "Point",
    name: "Point",
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
  field: instance.field,
  tool: instance.tool,
  wrapperProps: {},
};
