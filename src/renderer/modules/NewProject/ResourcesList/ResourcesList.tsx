import { Button, Container, Row, Spacer, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { NewProjectStore } from "renderer/models";
import { Resource } from "renderer/models/project/Resource";
import { useOpenDialog } from "renderer/services";
import { ResourcesListItem } from "./ResourcesListItem/ResourcesListItem";

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
      <Container gap={0} fluid>
        <Row align="center">
          <Text h3>{t("resourcesList")}</Text>
          <Spacer css={{ flexGrow: 1 }} />
          <Button auto onClick={handleOpenClick}>
            {t("resourceLocal")}
          </Button>
          <Spacer x={0.5} />
          <Button auto>{t("resourceURL")}</Button>
        </Row>
        <Spacer y={1} />
        {newProjectStore.resources.map((resource) => (
          <Row key={resource.id}>
            <ResourcesListItem
              resource={resource}
              onRemoveClick={handleRemoveClick(resource)}
            />
          </Row>
        ))}
      </Container>
    );
  }
);
