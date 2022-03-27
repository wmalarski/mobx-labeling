import { Button, Description, Grid, Input, Text } from "@geist-ui/core";
import {
  LockClosedIcon,
  LockOpen2Icon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { Item, WorkspaceStore } from "renderer/models";

type Props = {
  workspaceStore: Instance<typeof WorkspaceStore>;
  item: Instance<typeof Item>;
};

export const ItemHeader = observer(
  ({ workspaceStore, item }: Props): ReactElement => {
    const { t } = useTranslation("workspace");

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(item.name);

    const handleTrashClick = () => {
      workspaceStore.removeItem(item);
    };

    const handlePencilClick = () => {
      setIsEditing((current) => !current);
      item.setName(name);
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    };

    const handleBlockClick = () => {
      item.setBlocked(!item.blocked);
    };

    return (
      <Grid.Container gap={1}>
        <Grid xs={24}>
          <Description
            title={item.definition.name}
            width="100%"
            content={
              isEditing ? (
                <Input
                  value={name}
                  width="100%"
                  onChange={handleNameChange}
                  placeholder={t("itemNameLabel")}
                  label={t("itemNameLabel")}
                  aria-label={t("itemNameLabel")}
                />
              ) : (
                <Text h6>{item.name}</Text>
              )
            }
          />
        </Grid>
        <Grid>
          <Button
            auto
            iconRight={<TrashIcon aria-label={t("itemRemove")} />}
            onClick={handleTrashClick}
          />
        </Grid>
        <Grid>
          <Button
            auto
            iconRight={<Pencil1Icon aria-label={t("itemEditName")} />}
            onClick={handlePencilClick}
          />
        </Grid>
        <Grid>
          <Button
            auto
            iconRight={
              item.blocked ? (
                <LockClosedIcon aria-label={t("itemBlock")} />
              ) : (
                <LockOpen2Icon aria-label={t("itemUnblock")} />
              )
            }
            onClick={handleBlockClick}
          />
        </Grid>
      </Grid.Container>
    );
  }
);
