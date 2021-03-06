import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { LineDefinition } from "renderer/models";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { ColorEditor } from "./ColorEditor";

export default {
  title: "modules/DefinitionEditor/FieldEditor/ColorEditor",
  component: ColorEditor,
} as ComponentMeta<typeof ColorEditor>;

type Props = ComponentProps<typeof ColorEditor>;

const ColorEditorStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <ColorEditor {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof ColorEditorStory> = ColorEditorStory;

export const Playground = Template.bind({});
Playground.args = {
  fieldDefinition: LineDefinition.create({
    change: "EveryFrame",
    color: "hsl(0, 100%, 50%)",
    description: "s",
    id: "3",
    kind: "Line",
    name: "Shape field",
  }),
  wrapperProps: {},
};
