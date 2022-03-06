import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { Header } from "./Header";

export default {
  title: "modules/Header/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const HeaderStory = ({ wrapperProps }: PropsWithTestWrapper) => {
  return (
    <TestWrapper {...wrapperProps}>
      <Header />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof HeaderStory> = HeaderStory;

export const Playground = Template.bind({});
Playground.args = { wrapperProps: {} };
