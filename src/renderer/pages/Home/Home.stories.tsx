import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Router } from "react-location";
import { mockElectronServices } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { location, routes } from "renderer/utils/routes";
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
    <Router location={location} routes={routes()}>
      <TestWrapper {...wrapperProps}>
        <Home />
      </TestWrapper>
    </Router>
  );
};

const Template: ComponentStory<typeof HomeStory> = HomeStory;

export const Playground = Template.bind({});
Playground.args = { wrapperProps: {} };
