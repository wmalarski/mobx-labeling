import { ComponentMeta, ComponentStory } from "@storybook/react";
import { types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { LineDefinition, LineField } from "renderer/models";
import { Tool } from "renderer/models/project/Tool";
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
});

const instance = Model.create({
  tool: {
    kind: "Selector",
  },
  definition: {
    name: "Line",
    id: "id",
    kind: "Line",
  },
  field: {
    currentFrame: 1,
    definition: "id",
    id: "1",
    kind: "Line",
    values: { "1": { values: [0, 0, 100, 100] } },
  },
});

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  field: instance.field,
  tool: instance.tool,
};
