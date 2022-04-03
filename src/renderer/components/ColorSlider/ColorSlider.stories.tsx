import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { ColorSlider } from "./ColorSlider";

export default {
  title: "components/ColorSlider",
  component: ColorSlider,
} as ComponentMeta<typeof ColorSlider>;

type Props = ComponentProps<typeof ColorSlider>;

const ColorSliderStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <ColorSlider {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof ColorSliderStory> = ColorSliderStory;

export const Playground = Template.bind({});
Playground.args = {
  channel: "hue",
  defaultValue: "hsl(0, 100%, 50%)",
  wrapperProps: {},
};
