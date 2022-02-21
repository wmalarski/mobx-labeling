import { Container, Row, Spacer, Text } from "@nextui-org/react";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMatch } from "react-location";
import { IntroLayout, StyledLink } from "renderer/components";
import { DefinitionsList, NewProjectStore } from "renderer/models";
import { LocationGenerics, routePaths } from "renderer/utils/routes";
import { Header } from "../Header/Header";
import { ProjectDetails } from "./ProjectDetails/ProjectDetails";
import { ResourcesList } from "./ResourcesList/ResourcesList";

export const NewProject = (): ReactElement => {
  const { t } = useTranslation("project");

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

  return (
    <IntroLayout>
      <Header />
      <Spacer y={1} />
      <Container gap={0} fluid>
        <Row justify="space-between" align="center">
          <Text h2>{t("newProject")}</Text>
          <StyledLink to={routePaths.definitions}>
            {t("definitionsLink")}
          </StyledLink>
        </Row>
      </Container>
      <Spacer y={1} />
      <ProjectDetails newProjectStore={newProjectStore} />
      <ResourcesList newProjectStore={newProjectStore} />
    </IntroLayout>
  );
};
