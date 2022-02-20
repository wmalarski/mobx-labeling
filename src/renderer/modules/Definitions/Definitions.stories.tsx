import { ComponentMeta, ComponentStory } from "@storybook/react";
import { getSnapshot } from "mobx-state-tree";
import { useState } from "react";
import { Router } from "react-location";
import { mockDefinitionEntries } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { location, routes } from "renderer/utils/routes";
import { Definitions } from "./Definitions";

export default {
  title: "Definitions",
  component: Definitions,
  loaders: [
    async () => {
      const entries = mockDefinitionEntries().map((entry) =>
        getSnapshot(entry)
      );
      window.electron = {
        ipcDefinitions: {
          readDefinition: () => Promise.reject(),
          readDefinitions: () => Promise.resolve(entries),
          removeDefinition: () => Promise.resolve(),
          saveDefinition: () => Promise.resolve(),
        },
      };
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
