import { ComponentMeta, ComponentStory } from "@storybook/react";
import { types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { MultiSelectDefinition, MultiSelectField } from "renderer/models";
import { CurrentFrame } from "renderer/models/project/CurrentFrame";
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
  currentFrame: CurrentFrame,
  definition: MultiSelectDefinition,
  field: MultiSelectField,
});

const instance = Model.create({
  currentFrame: { id: "id" },
  definition: {
    id: "id",
    kind: "MultiSelect",
    name: "Text",
  },
  field: {
    currentFrame: "id",
    definition: "id",
    id: "1",
    kind: "MultiSelect",
  },
});

export const Playground = Template.bind({});
Playground.args = { wrapperProps: {}, field: instance.field };
