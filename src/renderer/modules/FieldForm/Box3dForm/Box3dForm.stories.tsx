import { ComponentMeta, ComponentStory } from "@storybook/react";
import { types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { Box3dDefinition, Box3dField, Tool } from "renderer/models";
import { CurrentFrame } from "renderer/models/project/CurrentFrame";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { Box3dForm } from "./Box3dForm";

export default {
  title: "modules/FieldForm/Box3dForm",
  component: Box3dForm,
} as ComponentMeta<typeof Box3dForm>;

type Props = ComponentProps<typeof Box3dForm>;

const Box3dFormStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <Box3dForm {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof Box3dFormStory> = Box3dFormStory;

const Model = types.model({
  currentFrame: CurrentFrame,
  definition: Box3dDefinition,
  field: Box3dField,
  tool: Tool,
});

const instance = Model.create({
  currentFrame: { id: "id" },
  tool: {
    kind: "Selector",
  },
  definition: {
    id: "id",
    kind: "Box3d",
    name: "Box3d",
  },
  field: {
    currentFrame: "id",
    definition: "id",
    id: "1",
    kind: "Box3d",
    values: {
      "0": {
        front: [0, 0, 0, 100, 100, 100, 100, 0],
        sideType: "None",
      },
    },
  },
});

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  field: instance.field,
  tool: instance.tool,
};
