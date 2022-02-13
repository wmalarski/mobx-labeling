import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { ItemDefinition, ProjectDefinition } from "renderer/models/definition";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { ItemForm } from "./ItemForm";

export default {
  title: "NewDefinition/ItemForm",
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
  itemDefinition: ItemDefinition.create({ name: "123" }),
  projectDefinition: ProjectDefinition.create({ name: "456" }),
};
