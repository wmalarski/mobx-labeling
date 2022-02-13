import { Card, Col, Container, Row, Text } from "@nextui-org/react";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearch } from "react-location";
import { IntroLayout } from "renderer/components";
import { ProjectDefinition } from "renderer/models/definition";
import { LocationGenerics, routePaths } from "renderer/utils/routes";
import { DefinitionForm } from "./DefinitionForm/DefinitionForm";
import { FieldEditor } from "./FieldEditor/FieldEditor";
import { FieldForm } from "./FieldForm/FieldForm";
import { FieldsList } from "./FieldsList/FieldsList";
import { ItemForm } from "./ItemForm/ItemForm";
import { ItemList } from "./ItemsList/ItemsList";

export const NewDefinition = (): ReactElement => {
  const { t } = useTranslation("definition");

  const { itemId, fieldId } = useSearch<LocationGenerics>();

  const [projectDefinition] = useState(() => {
    return ProjectDefinition.create({
      name: t("defaultDefinitionName"),
    });
  });

  const itemDefinition = projectDefinition.items.find(
    (item) => item.id === itemId
  );

  const fieldDefinition = itemDefinition?.fields.find(
    (field) => field.id === fieldId
  );

  return (
    <IntroLayout>
      <Text h1>{t("newDefinitionHeader")}</Text>
      <Link to={routePaths.definitions}>{t("definitionsList")}</Link>
      <Container>
        <DefinitionForm projectDefinition={projectDefinition} />
        <Row>
          <ItemList projectDefinition={projectDefinition} />
          {itemDefinition ? (
            <Col>
              <ItemForm
                itemDefinition={itemDefinition}
                projectDefinition={projectDefinition}
              />
              <FieldsList itemDefinition={itemDefinition} />
              {fieldDefinition ? (
                <Container>
                  <Row>
                    <FieldForm
                      fieldDefinition={fieldDefinition}
                      itemDefinition={itemDefinition}
                    />
                  </Row>
                  <Row>
                    <FieldEditor fieldDefinition={fieldDefinition} />
                  </Row>
                </Container>
              ) : (
                <Card>
                  <Text>{t("selectFieldDefinition")}</Text>
                </Card>
              )}
            </Col>
          ) : (
            <Card>
              <Text>{t("selectItemDefinition")}</Text>
            </Card>
          )}
        </Row>
      </Container>
    </IntroLayout>
  );
};
