import { ComponentMeta, ComponentStory } from "@storybook/react";
import { mockElectronServices } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { Home } from "./Home";

export default {
  title: "pages/Home/Home",
  component: Home,
  loaders: [
    async () => {
      window.electron = mockElectronServices();
      return {};
    },
  ],
} as ComponentMeta<typeof Home>;

const HomeStory = ({ wrapperProps }: PropsWithTestWrapper) => {
  return (
    <TestWrapper {...wrapperProps}>
      <Home />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof HomeStory> = HomeStory;

export const Playground = Template.bind({});
Playground.args = { wrapperProps: {} };
