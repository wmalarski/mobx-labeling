import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { SelectDefinition } from "renderer/models";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { SelectEditor } from "./SelectEditor";

export default {
  title: "DefinitionEditor/FieldEditor/SelectEditor",
  component: SelectEditor,
} as ComponentMeta<typeof SelectEditor>;

type Props = ComponentProps<typeof SelectEditor>;

const SelectEditorStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <SelectEditor {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof SelectEditorStory> = SelectEditorStory;

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  fieldDefinition: SelectDefinition.create({
    name: "Name123",
  }),
};
