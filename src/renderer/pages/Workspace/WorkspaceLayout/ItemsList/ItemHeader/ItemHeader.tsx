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
  item: Instance<typeof Item>;
  workspaceStore: Instance<typeof WorkspaceStore>;
};

export const ItemHeader = observer(
  ({ item, workspaceStore }: Props): ReactElement => {
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
      setIsEditing(false);
    };

    return (
      <Grid.Container gap={1}>
        <Grid xs={24}>
          <Description
            content={
              isEditing ? (
                <Input
                  aria-label={t("itemNameLabel")}
                  disabled={item.blocked}
                  label={t("itemNameLabel")}
                  onChange={handleNameChange}
                  placeholder={t("itemNameLabel")}
                  value={name}
                  width="100%"
                />
              ) : (
                <Text h6>{item.name}</Text>
              )
            }
            title={item.definition.name}
            width="100%"
          />
        </Grid>
        <Grid>
          <Button
            auto
            disabled={item.blocked}
            iconRight={<TrashIcon aria-label={t("itemRemove")} />}
            onClick={handleTrashClick}
          />
        </Grid>
        <Grid>
          <Button
            auto
            disabled={item.blocked}
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
