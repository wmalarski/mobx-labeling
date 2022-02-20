import { Input } from "@nextui-org/react";
import { Item } from "@react-stately/collections";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { ComboBox } from "./ComboBox";

export default {
  title: "components/ComboBox",
  component: ComboBox,
} as ComponentMeta<typeof ComboBox>;

type Props = ComponentProps<typeof ComboBox>;

const ComboBoxStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <ComboBox {...props}>
        <Item key="red panda">Red Panda</Item>
        <Item key="cat">Cat</Item>
        <Item key="dog">Dog</Item>
        <Item key="aardvark">Aardvark</Item>
        <Item key="kangaroo">Kangaroo</Item>
        <Item key="snake">Snake</Item>
      </ComboBox>
      <Input labelLeft="Hello" placeholder="Hello2" />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof ComboBoxStory> = ComboBoxStory;

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  label: "Favorite",
  placeholder: "Select animal",
};
