import { Button } from "@geist-ui/core";
import * as FlexLayout from "flexlayout-react";
import { Instance } from "mobx-state-tree";
import { ReactElement, ReactNode, useCallback, useState } from "react";
import { WorkspaceStore } from "renderer/models";
import "./dark.css";
import { ItemsList } from "./ItemsList/ItemsList";
import { getDefaultModel, LayoutNodeKind } from "./WorkspaceLayout.utils";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
};

export const WorkspaceLayout = ({ workspaceStore }: Props): ReactElement => {
  const [model, setModel] = useState(getDefaultModel);

  const factory = useCallback(
    (node: FlexLayout.TabNode): ReactNode => {
      const component = node.getComponent();
      switch (component) {
        case "button": {
          return (
            <div
              style={{
                width: "100%",
                height: "100%",
                border: "1px solid gray",
              }}
            >
              <Button>{node.getName()}</Button>
            </div>
          );
        }
        case LayoutNodeKind.ItemsList:
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
};
