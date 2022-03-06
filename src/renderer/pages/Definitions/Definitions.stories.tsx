import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import { Router } from "react-location";
import { mockElectronServices } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { location, routes } from "renderer/utils/routes";
import { Definitions } from "./Definitions";

export default {
  title: "Definitions/Definitions",
  component: Definitions,
  loaders: [
    async () => {
      window.electron = mockElectronServices();
      return {};
    },
  ],
} as ComponentMeta<typeof Definitions>;

const DefinitionsStory = ({ wrapperProps }: PropsWithTestWrapper) => {
  const [routerRoutes] = useState(routes);

  return (
    <Router location={location} routes={routerRoutes}>
      <TestWrapper {...wrapperProps}>
        <Definitions />
      </TestWrapper>
    </Router>
  );
};

const Template: ComponentStory<typeof DefinitionsStory> = DefinitionsStory;

export const Playground = Template.bind({});
Playground.args = { wrapperProps: {} };
