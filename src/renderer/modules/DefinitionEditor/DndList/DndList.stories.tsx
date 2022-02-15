import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { ProjectDefinition } from "renderer/models/definition";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { DndList } from "./DndList";

export default {
  title: "DefinitionEditor/DndList",
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
  wrapperProps: {},
  projectDefinition: ProjectDefinition.create({
    name: "Project",
    items: [
      {
        id: "Item1",
        name: "Item1",
        fields: [
          {
            id: "Field1",
            name: "Field1",
            kind: "CheckBox",
          },
          {
            id: "Field2",
            name: "Field2",
            kind: "ComboBox",
          },
        ],
      },
      {
        id: "Item2",
        name: "Item2",
        fields: [
          {
            id: "Field3",
            name: "Field3",
            kind: "Eye",
          },
          {
            id: "Field4",
            name: "Field4",
            kind: "Graph",
          },
        ],
      },
    ],
  }),
};
