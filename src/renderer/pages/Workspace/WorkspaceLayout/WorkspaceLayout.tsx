import * as FlexLayout from "flexlayout-react";
import { observer } from "mobx-react-lite";
import { getSnapshot, Instance } from "mobx-state-tree";
import { ReactElement, ReactNode, useCallback, useState } from "react";
import { WorkspaceStore } from "renderer/models";
import "./dark.css";
import { ItemsList } from "./ItemsList/ItemsList";
import { getDefaultModel, LayoutNodeKind } from "./WorkspaceLayout.utils";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
};

export const WorkspaceLayout = observer(
  ({ workspaceStore }: Props): ReactElement => {
    const projectSnapshot = getSnapshot(workspaceStore.project);
    const [model, setModel] = useState(() => {
      return getDefaultModel(projectSnapshot);
    });

    const factory = useCallback(
      (node: FlexLayout.TabNode): ReactNode => {
        const component = node.getComponent();
        switch (component) {
          case LayoutNodeKind.Items:
            return <ItemsList workspaceStore={workspaceStore} node={node} />;
          default:
            return <p>AA</p>;
        }
      },
      [workspaceStore]
    );

    return (
      <FlexLayout.Layout
        onModelChange={setModel}
        model={model}
        factory={factory}
      />
    );
  }
);
