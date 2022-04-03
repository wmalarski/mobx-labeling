import { Button, ButtonGroup } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { ItemDefinition, WorkspaceStore } from "renderer/models";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
};

export const SideBar = observer(({ workspaceStore }: Props): ReactElement => {
  const handleAddItemClick =
    (itemDefinition: Instance<typeof ItemDefinition>) => () => {
      workspaceStore.addItem(itemDefinition);
    };

  return (
    <ButtonGroup vertical>
      {workspaceStore.project.definition.items.map((itemDefinition) => (
        <Button
          auto
          key={itemDefinition.id}
          onClick={handleAddItemClick(itemDefinition)}
        >
          {itemDefinition.name}
        </Button>
      ))}
    </ButtonGroup>
  );
});
