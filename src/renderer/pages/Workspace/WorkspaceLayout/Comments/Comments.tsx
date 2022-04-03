import * as FlexLayout from "flexlayout-react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { WorkspaceStore } from "renderer/models";

type Props = {
  node: FlexLayout.TabNode;
  workspaceStore: Instance<typeof WorkspaceStore>;
};

export const Comments = observer(({ workspaceStore }: Props): ReactElement => {
  const { t } = useTranslation("workspace");

  return (
    <div>
      <p>{t("commentsNode")}</p>
      <div>{workspaceStore.project.name}</div>
    </div>
  );
});
