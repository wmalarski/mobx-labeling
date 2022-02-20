import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { mockDefinitionStore } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { DefinitionEditor } from "./DefinitionEditor";

export default {
  title: "DefinitionEditor/DefinitionEditor",
  component: DefinitionEditor,
} as ComponentMeta<typeof DefinitionEditor>;

type Props = ComponentProps<typeof DefinitionEditor>;

const DefinitionEditorStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <DefinitionEditor {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof DefinitionEditorStory> =
  DefinitionEditorStory;

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  definitionStore: mockDefinitionStore(),
};
