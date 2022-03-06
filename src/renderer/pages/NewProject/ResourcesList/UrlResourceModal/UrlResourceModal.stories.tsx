import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { mockNewProjectStore } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { UrlResourceModal } from "./UrlResourceModal";

export default {
  title: "pages/NewProject/ResourcesList/UrlResourceModel",
  component: UrlResourceModal,
} as ComponentMeta<typeof UrlResourceModal>;

type Props = ComponentProps<typeof UrlResourceModal>;

const UrlResourceModelStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <UrlResourceModal {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof UrlResourceModelStory> =
  UrlResourceModelStory;

export const Playground = Template.bind({});
Playground.args = { wrapperProps: {}, newProjectStore: mockNewProjectStore() };
