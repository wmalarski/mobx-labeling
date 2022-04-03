import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { MultiSelectDefinition } from "renderer/models";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { MultiSelectEditor } from "./MultiSelectEditor";

export default {
  title: "modules/DefinitionEditor/FieldEditor/MultiSelectEditor",
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
  fieldDefinition: MultiSelectDefinition.create({
    name: "Name123",
  }),
  wrapperProps: {},
};
