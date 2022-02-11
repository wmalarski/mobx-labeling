import { Col, Row, Text } from "@nextui-org/react";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearch } from "react-location";
import { IntroLayout } from "renderer/components/IntroLayout/IntroLayout";
import { ProjectDefinition } from "renderer/models/definition";
import { LocationGenerics, routePaths } from "renderer/utils/routes";
import { DefinitionForm } from "./DefinitionForm/DefinitionForm";
import { ObjectForm } from "./ObjectForm/ObjectForm";
import { ObjectsList } from "./ObjectsList/ObjectsList";

export const NewDefinition = (): ReactElement => {
  const { t } = useTranslation("definition");

  const { objectId } = useSearch<LocationGenerics>();

  const [projectDefinition] = useState(() => {
    return ProjectDefinition.create({
      name: t("defaultDefinitionName"),
    });
  });

  const objectDefinition = projectDefinition.objects.find(
    (object) => object.id === objectId
  );

  return (
    <IntroLayout>
      <Text h1>{t("newDefinitionHeader")}</Text>
      <Link to={routePaths.definitions}>{t("definitionsList")}</Link>
      <Col>
        <DefinitionForm projectDefinition={projectDefinition} />
        <Row>
          <ObjectsList projectDefinition={projectDefinition} />
          {objectDefinition && (
            <ObjectForm
              projectDefinition={projectDefinition}
              objectDefinition={objectDefinition}
            />
          )}
        </Row>
      </Col>
    </IntroLayout>
  );
};
