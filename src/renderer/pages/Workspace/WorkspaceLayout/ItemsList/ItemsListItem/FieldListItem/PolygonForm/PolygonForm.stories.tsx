import { ComponentMeta, ComponentStory } from "@storybook/react";
import { types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { PolygonDefinition, PolygonField } from "renderer/models";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { PolygonForm } from "./PolygonForm";

export default {
  title:
    "pages/Workspace/WorkspaceLayout/ItemsList/ItemsListItem/FieldListItem/PolygonForm",
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
  definition: PolygonDefinition,
  field: PolygonField,
});

const instance = Model.create({
  definition: {
    name: "Polygon",
    id: "id",
    kind: "Polygon",
  },
  field: {
    currentFrame: 1,
    definition: "id",
    id: "1",
    kind: "Polygon",
    values: { "1": { values: [0, 0, 100, 100] } },
  },
});

export const Playground = Template.bind({});
Playground.args = { wrapperProps: {}, field: instance.field };
