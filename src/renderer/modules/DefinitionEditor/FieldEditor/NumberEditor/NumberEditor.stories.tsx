import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { NumberDefinition } from "renderer/models";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { NumberEditor } from "./NumberEditor";

export default {
  title: "modules/DefinitionEditor/FieldEditor/NumberEditor",
  component: NumberEditor,
} as ComponentMeta<typeof NumberEditor>;

type Props = ComponentProps<typeof NumberEditor>;

const NumberEditorStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <NumberEditor {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof NumberEditorStory> = NumberEditorStory;

export const Playground = Template.bind({});
Playground.args = {
  fieldDefinition: NumberDefinition.create({
    name: "Name123",
  }),
  wrapperProps: {},
};
