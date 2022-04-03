import { ComponentMeta, ComponentStory } from "@storybook/react";
import { types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { LineDefinition, LineField, Tool } from "renderer/models";
import { CurrentFrame } from "renderer/models/project/CurrentFrame";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { LineForm } from "./LineForm";

export default {
  title:
    "pages/Workspace/WorkspaceLayout/ItemsList/ItemsListItem/FieldListItem/LineForm",
  component: LineForm,
} as ComponentMeta<typeof LineForm>;

type Props = ComponentProps<typeof LineForm>;

const LineFormStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <LineForm {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof LineFormStory> = LineFormStory;

const Model = types.model({
  definition: LineDefinition,
  field: LineField,
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
    kind: "Line",
    name: "Line",
  },
  field: {
    currentFrame: "id",
    definition: "id",
    id: "1",
    kind: "Line",
    values: { "0": { values: [0, 0, 100, 100] } },
  },
});

export const Playground = Template.bind({});
Playground.args = {
  field: instance.field,
  tool: instance.tool,
  wrapperProps: {},
};
