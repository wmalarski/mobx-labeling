import { ComponentMeta, ComponentStory } from "@storybook/react";
import { types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { PolygonDefinition, PolygonField, Tool } from "renderer/models";
import { CurrentFrame } from "renderer/models/project/CurrentFrame";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { PolygonForm } from "./PolygonForm";

export default {
  title: "modules/FieldForm/PolygonForm",
  component: PolygonForm,
} as ComponentMeta<typeof PolygonForm>;

type Props = ComponentProps<typeof PolygonForm>;

const PolygonFormStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <PolygonForm {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof PolygonFormStory> = PolygonFormStory;

const Model = types.model({
  currentFrame: CurrentFrame,
  definition: PolygonDefinition,
  field: PolygonField,
  tool: Tool,
});

const instance = Model.create({
  currentFrame: { id: "id" },
  tool: {
    kind: "Selector",
  },
  definition: {
    id: "id",
    kind: "Polygon",
    name: "Polygon",
  },
  field: {
    currentFrame: "id",
    definition: "id",
    id: "1",
    kind: "Polygon",
    values: { "0": { values: [0, 0, 100, 100] } },
  },
});

export const Playground = Template.bind({});
Playground.args = {
  field: instance.field,
  tool: instance.tool,
  wrapperProps: {},
};
