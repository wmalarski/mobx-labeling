import { Card, Col, Container, Row, Spacer, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { ProjectDefinition } from "renderer/models/definition";
import { DefinitionForm } from "../DefinitionForm/DefinitionForm";
import { FieldEditor } from "../FieldEditor/FieldEditor";
import { FieldForm } from "../FieldForm/FieldForm";
import { FieldsList } from "../FieldsList/FieldsList";
import { ItemForm } from "../ItemForm/ItemForm";
import { ItemsList } from "../ItemsList/ItemsList";

type Props = {
  projectDefinition: Instance<typeof ProjectDefinition>;
};

export const DefinitionEditor = observer(
  ({ projectDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const [itemId, setItemId] = useState<string | null>(null);
    const [fieldId, setFieldId] = useState<string | null>(null);

    const itemDefinition = projectDefinition.items.find(
      (item) => item.id === itemId
    );

    const fieldDefinition = itemDefinition?.fields.find(
      (field) => field.id === fieldId
    );

    return (
      <Container gap={0}>
        <Row>
          <DefinitionForm projectDefinition={projectDefinition} />
        </Row>
        <Spacer y={1} />
        <Row>
          <Container gap={0}>
            <Row>
              <Col span={3}>
                <ItemsList
                  projectDefinition={projectDefinition}
                  onItemClick={setItemId}
                />
              </Col>
              <Col span={9}>
                {itemDefinition ? (
                  <Container gap={0}>
                    <Row>
                      <Col>
                        <ItemForm
                          onSelectedItemChange={setItemId}
                          itemDefinition={itemDefinition}
                          projectDefinition={projectDefinition}
                        />
                        <Spacer y={1} />
                        <Container gap={0}>
                          <Row>
                            <Col span={3}>
                              <FieldsList
                                itemDefinition={itemDefinition}
                                onFieldClick={setFieldId}
                              />
                            </Col>
                            <Col span={9}>
                              {fieldDefinition ? (
                                <Container gap={0}>
                                  <FieldForm
                                    fieldDefinition={fieldDefinition}
                                    itemDefinition={itemDefinition}
                                    onSelectedFieldChange={setFieldId}
                                  />
                                  <Spacer y={1} />
                                  <FieldEditor
                                    fieldDefinition={fieldDefinition}
                                  />
                                </Container>
                              ) : (
                                <Card>
                                  <Text>{t("selectFieldDefinition")}</Text>
                                </Card>
                              )}
                            </Col>
                          </Row>
                        </Container>
                      </Col>
                    </Row>
                  </Container>
                ) : (
                  <Card>
                    <Text>{t("selectItemDefinition")}</Text>
                  </Card>
                )}
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
    );
  }
);
