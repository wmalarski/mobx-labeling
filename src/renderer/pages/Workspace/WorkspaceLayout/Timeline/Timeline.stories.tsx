import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { mockWorkspaceStore } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { Timeline } from "./Timeline";

export default {
  title: "pages/Workspace/WorkspaceLayout/Timeline",
  component: Timeline,
} as ComponentMeta<typeof Timeline>;

type Props = ComponentProps<typeof Timeline>;

const TimelineStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <Timeline {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof TimelineStory> = TimelineStory;

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  node: {
    setEventListener: () => void 0,
    removeEventListener: () => void 0,
    getRect() {
      return { width: 500, height: 500 };
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
  workspaceStore: mockWorkspaceStore({
    items: 4,
    update: {
      framesCount: 1250,
    },
  }),
};
