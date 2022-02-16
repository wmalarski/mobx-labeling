import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import {
  mockItemDefinition,
  mockProjectDefinition,
} from "renderer/utils/mocks";
import { ItemForm } from "./ItemForm";

export default {
  title: "DefinitionEditor/ItemForm",
  component: ItemForm,
} as ComponentMeta<typeof ItemForm>;

type Props = ComponentProps<typeof ItemForm>;

const ItemFormStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <ItemForm {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof ItemFormStory> = ItemFormStory;

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  itemDefinition: mockItemDefinition({ update: { name: "123" } }),
  projectDefinition: mockProjectDefinition(),
};
