import * as FlexLayout from "flexlayout-react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { WorkspaceStore } from "renderer/models";
import { ItemsListItem } from "./ItemsListItem/ItemsListItem";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
  node: FlexLayout.TabNode;
};

export const ItemsList = observer(({ workspaceStore }: Props): ReactElement => {
  const { t } = useTranslation("workspace");

  return (
    <div>
      <p>{t("ItemsList")}</p>
      {workspaceStore.batch.items.map((item) => (
        <ItemsListItem key={item.id} item={item} />
      ))}
    </div>
  );
});
