import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import {
  mockElectronServices,
  mockNewProjectStore,
} from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { ResourcesList } from "./ResourcesList";

export default {
  title: "NewProject/ResourcesList",
  component: ResourcesList,
  loaders: [
    async () => {
      window.electron = mockElectronServices();
      return {};
    },
  ],
} as ComponentMeta<typeof ResourcesList>;

type Props = ComponentProps<typeof ResourcesList>;

const ResourcesListStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <ResourcesList {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof ResourcesListStory> = ResourcesListStory;

export const Playground = Template.bind({});
Playground.args = {
  wrapperProps: {},
  newProjectStore: mockNewProjectStore({
    update: {
      definitions: {
        definitions: [],
      },
      name: "Name123",
      resources: [
        {
          fps: 20,
          path: "path/to/file",
          id: "qwe",
          frameShift: 0,
        },
      ],
    },
  }),
};
