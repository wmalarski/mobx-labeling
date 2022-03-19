import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { mockWorkspaceStore } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { WorkspaceLayout } from "./WorkspaceLayout";

export default {
  title: "pages/Workspace/WorkspaceLayout",
  component: WorkspaceLayout,
} as ComponentMeta<typeof WorkspaceLayout>;

type Props = ComponentProps<typeof WorkspaceLayout>;

const WorkspaceLayoutStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <WorkspaceLayout {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof WorkspaceLayoutStory> =
  WorkspaceLayoutStory;

export const Playground = Template.bind({});
Playground.args = { wrapperProps: {}, workspaceStore: mockWorkspaceStore() };
