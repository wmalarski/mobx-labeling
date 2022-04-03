import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { mockItemDefinition } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { FieldPlaceholder } from "./FieldPlaceholder";

export default {
  title: "modules/DefinitionEditor/FieldPlaceholder",
  component: FieldPlaceholder,
  argTypes: {
    onSelectedFieldChange: {
      type: "function",
    },
  },
} as ComponentMeta<typeof FieldPlaceholder>;

type Props = ComponentProps<typeof FieldPlaceholder>;

const FieldPlaceholderStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <FieldPlaceholder {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof FieldPlaceholderStory> =
  FieldPlaceholderStory;

export const Playground = Template.bind({});
Playground.args = {
  itemDefinition: mockItemDefinition({ update: { name: "123" } }),
  wrapperProps: {},
};
