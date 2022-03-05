import { Button, Grid, Spacer, Text } from "@geist-ui/core";
import { RowsIcon } from "@radix-ui/react-icons";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMatch, useNavigate } from "react-location";
import { IntroLayout } from "renderer/components";
import { DefinitionsList, NewProjectStore } from "renderer/models";
import { LocationGenerics, routePaths } from "renderer/utils/routes";
import { Header } from "../Header/Header";
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
    <IntroLayout>
      <Header />
      <Spacer h={1} />
      <Grid.Container gap={0}>
        <Grid justify="space-between" alignItems="center">
          <Text h2>{t("newProject")}</Text>
          <Button
            color="primary"
            auto
            onClick={handleDefinitionsClick}
            icon={<RowsIcon />}
          >
            {t("definitionsLink")}
          </Button>
        </Grid>
      </Grid.Container>
      <Spacer h={1} />
      <ProjectDetails newProjectStore={newProjectStore} />
      <Spacer h={1} />
      <ResourcesList newProjectStore={newProjectStore} />
    </IntroLayout>
  );
};
