import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { ComboBoxDefinition } from "renderer/models/fields/comboBox";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { FieldsListItem } from "./FieldsListItem";

export default {
  title: "NewDefinition/FieldsList/FieldsListItem",
  component: FieldsListItem,
  argTypes: {
    onFieldClick: {
      type: "function",
    },
  },
} as ComponentMeta<typeof FieldsListItem>;

type Props = ComponentProps<typeof FieldsListItem>;

const FieldsListItemStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <FieldsListItem {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof FieldsListItemStory> =
  FieldsListItemStory;

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  fieldDefinition: ComboBoxDefinition.create({ name: "Name" }),
};
