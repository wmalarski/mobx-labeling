import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { ItemDefinition } from "renderer/models/definition";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { FieldsList } from "./FieldsList";

export default {
  title: "NewDefinition/FieldsList",
  component: FieldsList,
  argTypes: {
    onFieldClick: {
      type: "function",
    },
  },
} as ComponentMeta<typeof FieldsList>;

type Props = ComponentProps<typeof FieldsList>;

const FieldsListStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <FieldsList {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof FieldsListStory> = FieldsListStory;

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  itemDefinition: ItemDefinition.create({
    name: "Name123",
  }),
};
