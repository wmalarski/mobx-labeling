import { ComponentMeta, ComponentStory } from "@storybook/react";
import { types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { EyeDefinition, EyeField } from "renderer/models";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { EyeForm } from "./EyeForm";

export default {
  title:
    "pages/Workspace/WorkspaceLayout/ItemsList/ItemsListItem/FieldListItem/EyeForm",
  component: EyeForm,
} as ComponentMeta<typeof EyeForm>;

type Props = ComponentProps<typeof EyeForm>;

const EyeFormStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <EyeForm {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof EyeFormStory> = EyeFormStory;

const Model = types.model({
  definition: EyeDefinition,
  field: EyeField,
});

const instance = Model.create({
  definition: {
    name: "Eye",
    id: "id",
    kind: "Eye",
  },
  field: {
    currentFrame: 1,
    definition: "id",
    id: "1",
    kind: "Eye",
    values: { "1": { values: [0, 0, 100, 100, 0, 100, 100, 0] } },
  },
});

export const Playground = Template.bind({});
Playground.args = { wrapperProps: {}, field: instance.field };
