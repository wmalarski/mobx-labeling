import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { ItemDefinition } from "renderer/models/definition";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { FieldCard } from "./FieldCard";

export default {
  title: "NewDefinition/ItemCard/FieldCard",
  component: FieldCard,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as ComponentMeta<typeof FieldCard> as any;

type Props = ComponentProps<typeof FieldCard>;

const FieldCardStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <FieldCard {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof FieldCardStory> = FieldCardStory;

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  itemDefinition: ItemDefinition.create({
    name: "Item name",
    fields: [{ name: "Field1", kind: "CheckBox" }],
  }),
};
