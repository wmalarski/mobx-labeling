import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { TextDefinition } from "renderer/models";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { TextEditor } from "./TextEditor";

export default {
  title: "modules/DefinitionEditor/FieldEditor/TextEditor",
  component: TextEditor,
} as ComponentMeta<typeof TextEditor>;

type Props = ComponentProps<typeof TextEditor>;

const TextEditorStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <TextEditor {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof TextEditorStory> = TextEditorStory;

export const Playground = Template.bind({});
Playground.args = {
  fieldDefinition: TextDefinition.create({ name: "Name123" }),
  wrapperProps: {},
};
