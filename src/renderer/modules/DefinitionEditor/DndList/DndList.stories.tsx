import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { mockProjectDefinition } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { DndList } from "./DndList";

export default {
  title: "modules/DefinitionEditor/DndList",
  component: DndList,
  argTypes: {
    onSelectedFieldChange: {
      type: "function",
    },
    onSelectedItemChange: {
      type: "function",
    },
  },
} as ComponentMeta<typeof DndList>;

type Props = ComponentProps<typeof DndList>;

const DndListStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <DndList {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof DndListStory> = DndListStory;

export const Playground = Template.bind({});
Playground.args = {
  projectDefinition: mockProjectDefinition(),
  wrapperProps: {},
};
