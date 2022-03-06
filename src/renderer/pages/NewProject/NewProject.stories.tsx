import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Router } from "react-location";
import { mockElectronServices } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { location, routes } from "renderer/utils/routes";
import { NewProject } from "./NewProject";

export default {
  title: "pages/NewProject/NewProject",
  component: NewProject,
  loaders: [
    async () => {
      window.electron = mockElectronServices();
      return {};
    },
  ],
} as ComponentMeta<typeof NewProject>;

const NewProjectStory = ({ wrapperProps }: PropsWithTestWrapper) => {
  return (
    <Router location={location} routes={routes()}>
      <TestWrapper {...wrapperProps}>
        <NewProject />
      </TestWrapper>
    </Router>
  );
};

const Template: ComponentStory<typeof NewProjectStory> = NewProjectStory;

export const Playground = Template.bind({});
Playground.args = { wrapperProps: {} };
