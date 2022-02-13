import { Item } from "@react-stately/collections";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { Select } from "./Select";

export default {
  title: "components/Select",
  component: Select,
} as ComponentMeta<typeof Select>;

type Props = ComponentProps<typeof Select>;

const SelectStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <Select {...props}>
        <Item>Red</Item>
        <Item>Orange</Item>
        <Item>Yellow</Item>
        <Item>Green</Item>
        <Item>Blue</Item>
        <Item>Purple</Item>
        <Item>Black</Item>
        <Item>White</Item>
        <Item>Lime</Item>
        <Item>Fushsia</Item>
      </Select>
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof SelectStory> = SelectStory;

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  label: "Favorite Color",
  placeholder: "Select color",
};
