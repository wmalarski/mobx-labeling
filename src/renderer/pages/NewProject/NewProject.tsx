import { Button, Grid, Page, Text } from "@geist-ui/core";
import { RowsIcon } from "@radix-ui/react-icons";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMatch, useNavigate } from "react-location";
import { DefinitionsList, NewProjectStore } from "renderer/models";
import { LocationGenerics, routePaths } from "renderer/utils/routes";
import { Header } from "../../modules/Header/Header";
import { ProjectDetails } from "./ProjectDetails/ProjectDetails";
import { ResourcesList } from "./ResourcesList/ResourcesList";

export const NewProject = (): ReactElement => {
  const { t } = useTranslation("project");

  const navigate = useNavigate();
  const { data } = useMatch<LocationGenerics>();

  const [newProjectStore] = useState(() => {
    return NewProjectStore.create({
      name: "",
      definitionId: data.projectDefinition?.id,
      resources: [],
      definitions: DefinitionsList.create({
        query: data.projectDefinition?.name,
      }),
    });
  });

  const handleDefinitionsClick = () => {
    navigate({
      to: routePaths.definitions,
    });
  };

  return (
    <Page>
      <Page.Header>
        <Header />
      </Page.Header>
      <Page.Content>
        <Grid.Container gap={1} justify="space-between" alignItems="center">
          <Grid>
            <Text h2>{t("newProject")}</Text>
          </Grid>
          <Grid>
            <Button
              color="primary"
              auto
              onClick={handleDefinitionsClick}
              icon={<RowsIcon />}
            >
              {t("definitionsLink")}
            </Button>
          </Grid>
          <Grid xs={24}>
            <ProjectDetails newProjectStore={newProjectStore} />
          </Grid>
          <Grid xs={24}>
            <ResourcesList newProjectStore={newProjectStore} />
          </Grid>
        </Grid.Container>
      </Page.Content>
    </Page>
  );
};
