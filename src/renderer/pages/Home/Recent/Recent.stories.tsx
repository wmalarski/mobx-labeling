import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { mockElectronServices, mockProjectsList } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
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
    <TestWrapper {...wrapperProps}>
      <Recent {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof RecentStory> = RecentStory;

export const Playground = Template.bind({});
Playground.args = { wrapperProps: {}, projectsList: mockProjectsList() };
