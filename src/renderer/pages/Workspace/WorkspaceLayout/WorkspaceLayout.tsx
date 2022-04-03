import * as FlexLayout from "flexlayout-react";
import { observer } from "mobx-react-lite";
import { getSnapshot, Instance } from "mobx-state-tree";
import { ReactElement, ReactNode, useCallback, useState } from "react";
import { WorkspaceStore } from "renderer/models";
import { Comments } from "./Comments/Comments";
import "./dark.css";
import { ItemsList } from "./ItemsList/ItemsList";
import { SideBar } from "./SideBar/SideBar";
import { Timeline } from "./Timeline/Timeline";
import { TopBar } from "./TopBar/TopBar";
import { Video } from "./Video/Video";
import * as Styles from "./WorkspaceLayout.styles";
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
      <Styles.Container>
        <TopBar workspaceStore={workspaceStore} />
        <Styles.Row>
          <SideBar workspaceStore={workspaceStore} />
          <Styles.Column>
            <FlexLayout.Layout
              factory={factory}
              model={model}
              onModelChange={setModel}
            />
          </Styles.Column>
        </Styles.Row>
      </Styles.Container>
    );
  }
);
