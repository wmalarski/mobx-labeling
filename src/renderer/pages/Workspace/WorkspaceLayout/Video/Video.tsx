import * as FlexLayout from "flexlayout-react";
import { observer } from "mobx-react-lite";
import { Instance, SnapshotOut } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Resource, WorkspaceStore } from "renderer/models";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
  node: FlexLayout.TabNode;
};

export const Video = observer(
  ({ workspaceStore, node }: Props): ReactElement => {
    const { t } = useTranslation("workspace");

    const resource: SnapshotOut<typeof Resource> = node.getConfig();

    return (
      <div>
        <p>{t("Video")}</p>
        <div>{JSON.stringify(resource, null, 2)}</div>
      </div>
    );
  }
);
