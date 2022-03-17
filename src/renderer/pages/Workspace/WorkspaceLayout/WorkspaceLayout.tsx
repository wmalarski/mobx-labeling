import * as FlexLayout from "flexlayout-react";
import { observer } from "mobx-react-lite";
import { getSnapshot, Instance } from "mobx-state-tree";
import { ReactElement, ReactNode, useCallback, useState } from "react";
import { WorkspaceStore } from "renderer/models";
import { Comments } from "./Comments/Comments";
import "./dark.css";
import { ItemsList } from "./ItemsList/ItemsList";
import { Timeline } from "./Timeline/Timeline";
import { Video } from "./Video/Video";
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
          case LayoutNodeKind.Timeline:
            return <Timeline workspaceStore={workspaceStore} node={node} />;
          case LayoutNodeKind.Video:
            return <Video workspaceStore={workspaceStore} node={node} />;
          case LayoutNodeKind.Comments:
            return <Comments workspaceStore={workspaceStore} node={node} />;
          default:
            return null;
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
