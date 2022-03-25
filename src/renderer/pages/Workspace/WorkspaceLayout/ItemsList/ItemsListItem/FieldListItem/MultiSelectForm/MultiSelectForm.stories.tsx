import { ComponentMeta, ComponentStory } from "@storybook/react";
import { types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { MultiSelectDefinition, MultiSelectField } from "renderer/models";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { MultiSelectForm } from "./MultiSelectForm";

export default {
  title:
    "pages/Workspace/WorkspaceLayout/ItemsList/ItemsListItem/FieldListItem/MultiSelectForm",
  component: MultiSelectForm,
} as ComponentMeta<typeof MultiSelectForm>;

type Props = ComponentProps<typeof MultiSelectForm>;

const MultiSelectFormStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <MultiSelectForm {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof MultiSelectFormStory> =
  MultiSelectFormStory;

const Model = types.model({
  definition: MultiSelectDefinition,
  field: MultiSelectField,
});

const instance = Model.create({
  definition: {
    name: "Text",
    id: "id",
    kind: "MultiSelect",
  },
  field: {
    currentFrame: 1,
    definition: "id",
    id: "1",
    kind: "MultiSelect",
  },
});

export const Playground = Template.bind({});
Playground.args = { wrapperProps: {}, field: instance.field };
