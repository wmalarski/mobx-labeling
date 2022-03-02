import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  mockIpcDefinitionsService,
  mockIpcResourcesService,
} from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { NewProject } from "./NewProject";

export default {
  title: "NewProject/NewProject",
  component: NewProject,
  loaders: [
    async () => {
      window.electron = {
        ipcDefinitions: mockIpcDefinitionsService(),
        ipcResources: mockIpcResourcesService(),
      };
      return {};
    },
  ],
} as ComponentMeta<typeof NewProject>;

const NewProjectStory = ({ wrapperProps }: PropsWithTestWrapper) => {
  return (
    <TestWrapper {...wrapperProps}>
      <NewProject />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof NewProjectStory> = NewProjectStory;

export const Playground = Template.bind({});
Playground.args = { wrapperProps: {} };
