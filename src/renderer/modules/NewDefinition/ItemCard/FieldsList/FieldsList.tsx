import { Button, Col, Row, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ItemDefinition } from "renderer/models/definition";
import { FieldsListItem } from "./FieldsListItem/FieldsListItem";

type Props = {
  itemDefinition: Instance<typeof ItemDefinition>;
};

export const FieldsList = observer(
  ({ itemDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handlePlusClick = () => {
      itemDefinition.addNewField(t("defaultFieldName"));
    };

    return (
      <Col>
        <Row>
          <Text h3>{t("definitionFields")}</Text>
          <Button auto onClick={handlePlusClick}>
            {t("addNewField")}
          </Button>
        </Row>
        <Col>
          {itemDefinition.fields.map((fieldDefinition) => (
            <FieldsListItem
              key={fieldDefinition.id}
              fieldDefinition={fieldDefinition}
            />
          ))}
        </Col>
      </Col>
    );
  }
);
