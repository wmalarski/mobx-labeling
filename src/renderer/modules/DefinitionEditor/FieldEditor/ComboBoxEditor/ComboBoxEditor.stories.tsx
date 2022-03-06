import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { ComboBoxDefinition } from "renderer/models";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { ComboBoxEditor } from "./ComboBoxEditor";

export default {
  title: "modules/DefinitionEditor/FieldEditor/ComboBoxEditor",
  component: ComboBoxEditor,
} as ComponentMeta<typeof ComboBoxEditor>;

type Props = ComponentProps<typeof ComboBoxEditor>;

const ComboBoxEditorStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <ComboBoxEditor {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof ComboBoxEditorStory> =
  ComboBoxEditorStory;

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  fieldDefinition: ComboBoxDefinition.create({
    name: "Field123",
  }),
};
