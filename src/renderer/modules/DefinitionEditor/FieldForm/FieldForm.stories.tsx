import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { CheckBoxDefinition } from "renderer/models";
import { mockItemDefinition } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { FieldForm } from "./FieldForm";

export default {
  title: "modules/DefinitionEditor/FieldForm",
  component: FieldForm,
  argTypes: {
    onKindChange: {
      type: "function",
    },
  },
} as ComponentMeta<typeof FieldForm>;

type Props = ComponentProps<typeof FieldForm>;

const FieldFormStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <FieldForm {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof FieldFormStory> = FieldFormStory;

const fieldDefinition = CheckBoxDefinition.create({
  name: "Name123",
});

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  itemDefinition: mockItemDefinition({
    update: {
      fields: [fieldDefinition],
    },
  }),
  fieldDefinition,
};
