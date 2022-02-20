import { Card, Col, Container, Row, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { DefinitionEntry } from "renderer/models";

type Props = {
  definitionEntry: Instance<typeof DefinitionEntry>;
};

export const DefinitionsItem = observer(
  ({ definitionEntry }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    return (
      <Card>
        <Container gap={0}>
          <Row>
            <Col>
              <Text>{t("namePlaceholder")}</Text>
            </Col>
            <Col>
              <Text>{definitionEntry.name}</Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text>{t("descriptionPlaceholder")}</Text>
            </Col>
            <Col>
              <Text>{definitionEntry.description}</Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text>{t("updatedAt")}</Text>
            </Col>
            <Col>
              <Text>{new Date(definitionEntry.updatedAt).toISOString()}</Text>
            </Col>
          </Row>
        </Container>
      </Card>
    );
  }
);
