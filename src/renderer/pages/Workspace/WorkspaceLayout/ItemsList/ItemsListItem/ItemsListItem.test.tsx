import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { Item, ItemDefinition, Tool } from "renderer/models";
import { CurrentFrame } from "renderer/models/project/CurrentFrame";
import { mockItemDefinition } from "renderer/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import i18n from "renderer/utils/i18next";
import { ItemsListItem } from "./ItemsListItem";

type Props = ComponentProps<typeof ItemsListItem>;

const Model = types.model({
  item: Item,
  definition: ItemDefinition,
  tool: Tool,
  currentFrame: CurrentFrame,
});

const getInstance = () => {
  const definition = mockItemDefinition({});
  return Model.create({
    definition,
    item: {
      definition: definition.id,
      name: "Name",
      currentFrame: "frame",
      fields: definition.fields.map((fieldDefinition) => ({
        kind: fieldDefinition.kind,
        currentFrame: "frame",
        definition: fieldDefinition.id,
      })),
    },
    tool: { kind: "Selector" },
    currentFrame: { id: "frame" },
  });
};

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const instance = getInstance();
  const defaultProps: Props = {
    item: instance.item,
    tool: instance.tool,
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <ItemsListItem {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<ItemsListItem />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    const header = i18n.t<string>("itemTableKey", { ns: "workspace" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });
});
