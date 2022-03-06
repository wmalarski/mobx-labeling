import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { Router } from "react-location";
import { mockElectronServices, mockProjectsList } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { location, routes } from "renderer/utils/routes";
import { Recent } from "./Recent";

export default {
  title: "pages/Home/Recent",
  component: Recent,
  loaders: [
    async () => {
      window.electron = mockElectronServices();
      return {};
    },
  ],
} as ComponentMeta<typeof Recent>;

type Props = ComponentProps<typeof Recent>;

const RecentStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <Router location={location} routes={routes()}>
      <TestWrapper {...wrapperProps}>
        <Recent {...props} />
      </TestWrapper>
    </Router>
  );
};

const Template: ComponentStory<typeof RecentStory> = RecentStory;

export const Playground = Template.bind({});
Playground.args = { wrapperProps: {}, projectsList: mockProjectsList() };
