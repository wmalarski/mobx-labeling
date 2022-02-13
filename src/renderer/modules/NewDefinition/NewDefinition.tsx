import { Col, Row, Text } from "@nextui-org/react";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-location";
import { IntroLayout } from "renderer/components";
import { ProjectDefinition } from "renderer/models/definition";
import { routePaths } from "renderer/utils/routes";
import { DefinitionForm } from "./DefinitionForm/DefinitionForm";
import { ItemCard } from "./ItemCard/ItemCard";
import { ItemList } from "./ItemsList/ItemsList";

export const NewDefinition = (): ReactElement => {
  const { t } = useTranslation("definition");

  const [projectDefinition] = useState(() => {
    return ProjectDefinition.create({
      name: t("defaultDefinitionName"),
    });
  });

  return (
    <IntroLayout>
      <Text h1>{t("newDefinitionHeader")}</Text>
      <Link to={routePaths.definitions}>{t("definitionsList")}</Link>
      <Col>
        <DefinitionForm projectDefinition={projectDefinition} />
        <Row>
          <ItemList projectDefinition={projectDefinition} />
          <ItemCard projectDefinition={projectDefinition} />
        </Row>
      </Col>
    </IntroLayout>
  );
};
