import { Description, Grid, Text } from "@geist-ui/core";
import * as FlexLayout from "flexlayout-react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { Fragment, ReactElement } from "react";
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
    <Grid.Container gap={0.5} width="100%">
      <Grid xs={24} paddingLeft={1} paddingRight={1}>
        <Text h5>{t("itemsList")}</Text>
      </Grid>
      {workspaceStore.batch.items.map((item) => (
        <Fragment key={item.id}>
          <Grid xs={24} paddingLeft={1} paddingRight={1} paddingTop={1}>
            <Description
              title={item.definition.name}
              content={<Text h6>{item.name}</Text>}
            />
          </Grid>
          <Grid xs={24} paddingLeft={1} paddingRight={1}>
            <ItemsListItem item={item} tool={workspaceStore.tool} />
          </Grid>
        </Fragment>
      ))}
      {workspaceStore.batch.items.length < 1 && (
        <Grid xs={24} alignItems="center" justify="center">
          <Text h6>{t("itemTableEmpty")}</Text>
        </Grid>
      )}
    </Grid.Container>
  );
});
