import { Button, Grid, Text } from "@geist-ui/core";
import { FileIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { NewProjectStore, Resource } from "renderer/models";
import { useOpenDialog } from "renderer/services";
import { ResourcesListItem } from "./ResourcesListItem/ResourcesListItem";
import { UrlResourceModal } from "./UrlResourceModal/UrlResourceModal";

type Props = {
  newProjectStore: Instance<typeof NewProjectStore>;
};

export const ResourcesList = observer(
  ({ newProjectStore }: Props): ReactElement => {
    const { t } = useTranslation("project");

    const { open: openSelectDialog } = useOpenDialog({
      onReturn: (result) => {
        result.filePaths.forEach((path) => {
          newProjectStore.addResource(path);
        });
      },
    });

    const handleOpenClick = () => {
      openSelectDialog({
        title: t("selectResourceDialog"),
      });
    };

    const handleRemoveClick = (resource: Instance<typeof Resource>) => () => {
      newProjectStore.removeResource(resource);
    };

    return (
      <Grid.Container gap={1} justify="space-between" alignItems="center">
        <Grid>
          <Text h3>{t("resourcesList")}</Text>
        </Grid>
        <Grid style={{ flexGrow: 1 }} />
        <Grid>
          <Button icon={<FileIcon />} auto onClick={handleOpenClick}>
            {t("resourceLocal")}
          </Button>
        </Grid>
        <Grid>
          <UrlResourceModal newProjectStore={newProjectStore} />
        </Grid>
        {newProjectStore.resources.map((resource) => (
          <Grid xs={24} key={resource.id}>
            <ResourcesListItem
              onRemoveClick={handleRemoveClick(resource)}
              resource={resource}
            />
          </Grid>
        ))}
      </Grid.Container>
    );
  }
);
