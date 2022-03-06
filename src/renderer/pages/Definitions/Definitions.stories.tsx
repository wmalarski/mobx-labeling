import { ComponentMeta, ComponentStory } from "@storybook/react";
import { mockElectronServices } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { Definitions } from "./Definitions";

export default {
  title: "pages/Definitions/Definitions",
  component: Definitions,
  loaders: [
    async () => {
      window.electron = mockElectronServices();
      return {};
    },
  ],
} as ComponentMeta<typeof Definitions>;

const DefinitionsStory = ({ wrapperProps }: PropsWithTestWrapper) => {
  return (
    <TestWrapper {...wrapperProps}>
      <Definitions />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof DefinitionsStory> = DefinitionsStory;

export const Playground = Template.bind({});
Playground.args = { wrapperProps: {} };
