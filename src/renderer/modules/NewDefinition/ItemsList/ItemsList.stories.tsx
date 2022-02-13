import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { ProjectDefinition } from "renderer/models/definition";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { ItemsList } from "./ItemsList";

export default {
  title: "NewDefinition/ItemsList",
  component: ItemsList,
  argTypes: {
    onItemClick: {
      type: "function",
    },
  },
} as ComponentMeta<typeof ItemsList>;

type Props = ComponentProps<typeof ItemsList>;

const ItemsListStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <ItemsList {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof ItemsListStory> = ItemsListStory;

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  projectDefinition: ProjectDefinition.create({ name: "123" }),
};
