import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { CheckBoxDefinition } from "renderer/models";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { CheckBoxEditor } from "./CheckBoxEditor";

export default {
  title: "modules/DefinitionEditor/FieldEditor/CheckBoxEditor",
  component: CheckBoxEditor,
} as ComponentMeta<typeof CheckBoxEditor>;

type Props = ComponentProps<typeof CheckBoxEditor>;

const CheckBoxEditorStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <CheckBoxEditor {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof CheckBoxEditorStory> =
  CheckBoxEditorStory;

export const Playground = Template.bind({});
Playground.args = {
  fieldDefinition: CheckBoxDefinition.create({
    change: "EveryFrame",
    default: true,
    description: "Very descriptive",
    id: "elo123",
    kind: "CheckBox",
    name: "Checkbox",
  }),
  wrapperProps: {},
};
