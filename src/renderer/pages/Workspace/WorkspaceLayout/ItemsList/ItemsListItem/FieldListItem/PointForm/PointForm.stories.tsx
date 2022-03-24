import { ComponentMeta, ComponentStory } from "@storybook/react";
import { types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { PointDefinition, PointField } from "renderer/models";
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
});

const instance = Model.create({
  definition: {
    name: "Point",
    id: "id",
    kind: "Point",
  },
  field: {
    currentFrame: 1,
    definition: "id",
    id: "1",
    kind: "Point",
    values: { "1": { value: [0, 0] } },
  },
});

export const Playground = Template.bind({});
Playground.args = { wrapperProps: {}, field: instance.field };
