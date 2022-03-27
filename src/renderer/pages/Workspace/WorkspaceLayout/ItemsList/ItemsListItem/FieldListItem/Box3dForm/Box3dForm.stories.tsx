import { ComponentMeta, ComponentStory } from "@storybook/react";
import { types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { Box3dDefinition, Box3dField, Tool } from "renderer/models";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { Box3dForm } from "./Box3dForm";

export default {
  title:
    "pages/Workspace/WorkspaceLayout/ItemsList/ItemsListItem/FieldListItem/Box3dForm",
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
  definition: Box3dDefinition,
  field: Box3dField,
  tool: Tool,
});

const instance = Model.create({
  tool: {
    kind: "Selector",
  },
  definition: {
    name: "Box3d",
    id: "id",
    kind: "Box3d",
  },
  field: {
    currentFrame: 1,
    definition: "id",
    id: "1",
    kind: "Box3d",
    values: {
      "1": {
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
