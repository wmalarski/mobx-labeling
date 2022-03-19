import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { mockLayoutNode, mockWorkspaceStore } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { Video } from "./Video";

export default {
  title: "pages/Workspace/WorkspaceLayout/Video",
  component: Video,
} as ComponentMeta<typeof Video>;

type Props = ComponentProps<typeof Video>;

const VideoStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <Video {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof VideoStory> = VideoStory;

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  workspaceStore: mockWorkspaceStore(),
  node: mockLayoutNode(),
};
