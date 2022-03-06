import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { Router } from "react-location";
import { mockDefinitionStore } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { location, routes } from "renderer/utils/routes";
import { DefinitionEditor } from "./DefinitionEditor";

export default {
  title: "modules/DefinitionEditor/DefinitionEditor",
  component: DefinitionEditor,
} as ComponentMeta<typeof DefinitionEditor>;

type Props = ComponentProps<typeof DefinitionEditor>;

const DefinitionEditorStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <Router location={location} routes={routes()}>
      <TestWrapper {...wrapperProps}>
        <DefinitionEditor {...props} />
      </TestWrapper>
    </Router>
  );
};

const Template: ComponentStory<typeof DefinitionEditorStory> =
  DefinitionEditorStory;

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  definitionStore: mockDefinitionStore(),
};
