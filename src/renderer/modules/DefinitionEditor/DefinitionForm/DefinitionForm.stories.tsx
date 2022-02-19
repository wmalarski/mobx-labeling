import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { mockProjectDefinition } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { DefinitionForm } from "./DefinitionForm";

export default {
  title: "DefinitionEditor/DefinitionForm",
  component: DefinitionForm,
} as ComponentMeta<typeof DefinitionForm>;

type Props = ComponentProps<typeof DefinitionForm>;

const DefinitionFormStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <DefinitionForm {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof DefinitionFormStory> =
  DefinitionFormStory;

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  projectDefinition: mockProjectDefinition(),
};
