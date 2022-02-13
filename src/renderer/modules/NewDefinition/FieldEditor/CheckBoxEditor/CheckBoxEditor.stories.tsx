import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { CheckBoxDefinition } from "renderer/models/fields/checkBox";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { CheckBoxEditor } from "./CheckBoxEditor";

export default {
  title: "NewDefinition/FieldEditor/CheckBoxEditor",
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
  wrapperProps: {},
  fieldDefinition: CheckBoxDefinition.create({
    name: "Checkbox",
    change: "EveryFrame",
    default: true,
    description: "Very descriptive",
    id: "elo123",
    kind: "CheckBox",
  }),
};
