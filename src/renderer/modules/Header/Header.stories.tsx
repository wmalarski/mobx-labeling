import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Router } from "react-location";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { location, routes } from "renderer/utils/routes";
import { Header } from "./Header";

export default {
  title: "Header/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const HeaderStory = ({ wrapperProps }: PropsWithTestWrapper) => {
  return (
    <Router location={location} routes={routes()}>
      <TestWrapper {...wrapperProps}>
        <Header />
      </TestWrapper>
    </Router>
  );
};

const Template: ComponentStory<typeof HeaderStory> = HeaderStory;

export const Playground = Template.bind({});
Playground.args = { wrapperProps: {} };
