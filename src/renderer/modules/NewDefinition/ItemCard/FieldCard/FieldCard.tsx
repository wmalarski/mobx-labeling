import { Button, Card, Container, Row, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useSearch } from "react-location";
import { DefinitionKind, ItemDefinition } from "renderer/models/definition";
import { LocationGenerics } from "renderer/utils/routes";
import { FieldEditor } from "./FieldEditor/FieldEditor";
import { FieldForm } from "./FieldForm/FieldForm";

type Props = {
  itemDefinition: Instance<typeof ItemDefinition>;
};

export const FieldCard = observer(({ itemDefinition }: Props): ReactElement => {
  const { t } = useTranslation("definition");

  const { fieldId } = useSearch<LocationGenerics>();

  const fieldDefinition = itemDefinition.fields.find(
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
    itemDefinition.removeField(fieldDefinition);
  };

  const handleCopyClick = () => {
    itemDefinition.copyField(
      fieldDefinition,
      t("copyName", { name: fieldDefinition.name })
    );
  };

  const handleKindChange = (kind: DefinitionKind) => {
    itemDefinition.changeKind(fieldDefinition, kind);
  };

  return (
    <Container>
      <Row>
        <FieldForm
          fieldDefinition={fieldDefinition}
          onKindChange={handleKindChange}
        />
      </Row>
      <Row>
        <Button auto onClick={handleRemoveClick}>
          {t("removeField")}
        </Button>
      </Row>
      <Row>
        <Button auto onClick={handleCopyClick}>
          {t("copyField")}
        </Button>
      </Row>
      <Row>
        <FieldEditor fieldDefinition={fieldDefinition} />
      </Row>
    </Container>
  );
});
