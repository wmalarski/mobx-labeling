import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { MultiSelectDefinition } from "renderer/models/fields/multiSelect";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { MultiSelectEditor } from "./MultiSelectEditor";

export default {
  title: "NewDefinition/ItemCard/FieldCard/FieldEditor/MultiSelectEditor",
  component: MultiSelectEditor,
} as ComponentMeta<typeof MultiSelectEditor>;

type Props = ComponentProps<typeof MultiSelectEditor>;

const MultiSelectEditorStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <MultiSelectEditor {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof MultiSelectEditorStory> =
  MultiSelectEditorStory;

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  fieldDefinition: MultiSelectDefinition.create({
    name: "Name123",
  }),
};
