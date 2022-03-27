import { ComponentMeta, ComponentStory } from "@storybook/react";
import { types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { GraphDefinition, GraphField, Tool } from "renderer/models";
import { CurrentFrame } from "renderer/models/project/CurrentFrame";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { GraphForm } from "./GraphForm";

export default {
  title:
    "pages/Workspace/WorkspaceLayout/ItemsList/ItemsListItem/FieldListItem/GraphForm",
  component: GraphForm,
} as ComponentMeta<typeof GraphForm>;

type Props = ComponentProps<typeof GraphForm>;

const GraphFormStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <GraphForm {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof GraphFormStory> = GraphFormStory;

const Model = types.model({
  definition: GraphDefinition,
  field: GraphField,
  tool: Tool,
  currentFrame: CurrentFrame,
});

const instance = Model.create({
  currentFrame: { id: "id" },
  tool: {
    kind: "Selector",
  },
  definition: {
    name: "Graph",
    id: "id",
    kind: "Graph",
  },
  field: {
    currentFrame: "id",
    definition: "id",
    id: "1",
    kind: "Graph",
    values: {
      "1": {
        edges: [{ from: 0, to: 1 }],
        points: [
          { x: 0, y: 0 },
          { x: 10, y: 100 },
        ],
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
