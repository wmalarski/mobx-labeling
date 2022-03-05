import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { Router } from "react-location";
import { mockDefinitionStore } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { location, routes } from "renderer/utils/routes";
import { DefinitionForm } from "./DefinitionForm";

export default {
  title: "DefinitionEditor/DefinitionForm",
  component: DefinitionForm,
} as ComponentMeta<typeof DefinitionForm>;

type Props = ComponentProps<typeof DefinitionForm>;

const DefinitionFormStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <Router location={location} routes={routes()}>
      <TestWrapper {...wrapperProps}>
        <DefinitionForm {...props} />
      </TestWrapper>
    </Router>
  );
};

const Template: ComponentStory<typeof DefinitionFormStory> =
  DefinitionFormStory;

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  definitionStore: mockDefinitionStore(),
};
