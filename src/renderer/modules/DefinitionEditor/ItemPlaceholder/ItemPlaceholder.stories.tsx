import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { mockProjectDefinition } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { ItemPlaceholder } from "./ItemPlaceholder";

export default {
  title: "modules/DefinitionEditor/ItemPlaceholder",
  component: ItemPlaceholder,
  argTypes: {
    onSelectedItemChange: {
      type: "function",
    },
  },
} as ComponentMeta<typeof ItemPlaceholder>;

type Props = ComponentProps<typeof ItemPlaceholder>;

const ItemPlaceholderStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <ItemPlaceholder {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof ItemPlaceholderStory> =
  ItemPlaceholderStory;

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  projectDefinition: mockProjectDefinition({ update: { name: "1" } }),
};
