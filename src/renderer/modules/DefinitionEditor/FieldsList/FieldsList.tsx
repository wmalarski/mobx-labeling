import { Button, Container, Row, Spacer, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { Fragment, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ItemDefinition } from "renderer/models/definition";
import { FieldsListItem } from "./FieldsListItem/FieldsListItem";

type Props = {
  itemDefinition: Instance<typeof ItemDefinition>;
  onFieldClick: (fieldId: string | null) => void;
};

export const FieldsList = observer(
  ({ itemDefinition, onFieldClick }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handlePlusClick = () => {
      const field = itemDefinition.addNewField(t("defaultFieldName"));
      onFieldClick(field.id);
    };

    const handleFieldClick = (fieldId: string) => () => {
      onFieldClick(fieldId);
    };

    return (
      <Container gap={0}>
        <Row>
          <Text h3>{t("definitionFields")}</Text>
          <Spacer y={0.5} />
          <Button auto rounded onClick={handlePlusClick}>
            {t("addNewField")}
          </Button>
        </Row>
        {itemDefinition.fields.map((fieldDefinition) => (
          <Fragment key={fieldDefinition.id}>
            <Spacer y={0.5} />
            <Row>
              <FieldsListItem
                fieldDefinition={fieldDefinition}
                onFieldClick={handleFieldClick(fieldDefinition.id)}
              />
            </Row>
          </Fragment>
        ))}
      </Container>
    );
  }
);
