import { Button, Card, Col, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useSearch } from "react-location";
import { ObjectDefinition } from "renderer/models/definition";
import { LocationGenerics } from "renderer/utils/routes";
import { FieldEditor } from "./FieldEditor/FieldEditor";
import { FieldForm } from "./FieldForm/FieldForm";

type Props = {
  objectDefinition: Instance<typeof ObjectDefinition>;
};

export const FieldCard = observer(
  ({ objectDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const { fieldId } = useSearch<LocationGenerics>();

    const fieldDefinition = objectDefinition.fields.find(
      (field) => field.id === fieldId
    );

    if (!fieldDefinition) {
      return (
        <Card>
          <Text>{t("selectFieldDefinition")}</Text>
        </Card>
      );
    }

    const handleRemoveClick = () => {
      objectDefinition.removeField(fieldDefinition);
    };

    const handleCopyClick = () => {
      objectDefinition.copyField(
        fieldDefinition,
        t("copyName", { name: fieldDefinition.name })
      );
    };

    return (
      <Col>
        <FieldForm fieldDefinition={fieldDefinition} />
        <Button auto onClick={handleRemoveClick}>
          {t("removeField")}
        </Button>
        <Button auto onClick={handleCopyClick}>
          {t("copyField")}
        </Button>
        <FieldEditor fieldDefinition={fieldDefinition} />
      </Col>
    );
  }
);
