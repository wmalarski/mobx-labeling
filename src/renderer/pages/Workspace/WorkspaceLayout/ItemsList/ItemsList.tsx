import * as FlexLayout from "flexlayout-react";
import { observer } from "mobx-react-lite";
import { getSnapshot, Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { WorkspaceStore } from "renderer/models";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
  node: FlexLayout.TabNode;
};

export const ItemsList = observer(({ workspaceStore }: Props): ReactElement => {
  const { t } = useTranslation("common");
  return (
    <div>
      <p>{t("ItemsList")}</p>
      <pre>
        {JSON.stringify(getSnapshot(workspaceStore.batch.items), null, 2)}
      </pre>
    </div>
  );
});
