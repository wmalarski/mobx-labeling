import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { ItemDefinition } from "renderer/models/definition";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { ItemsListItem } from "./ItemsListItem";

export default {
  title: "DefinitionEditor/ItemsList/ItemsListItem",
  component: ItemsListItem,
  argTypes: {
    onItemClick: {
      type: "function",
    },
  },
} as ComponentMeta<typeof ItemsListItem>;

type Props = ComponentProps<typeof ItemsListItem>;

const ItemsListItemStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <ItemsListItem {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof ItemsListItemStory> = ItemsListItemStory;

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  itemDefinition: ItemDefinition.create({ name: "124" }),
};
