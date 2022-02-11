import { Button, Card, Col, Text } from "@nextui-org/react";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useSearch } from "react-location";
import { ProjectDefinition } from "renderer/models/definition";
import { LocationGenerics } from "renderer/utils/routes";
import { FieldCard } from "./FieldCard/FieldCard";
import { FieldsList } from "./FieldsList/FieldsList";
import { ObjectForm } from "./ObjectForm/ObjectForm";

type Props = {
  projectDefinition: Instance<typeof ProjectDefinition>;
};

export const ObjectCard = ({ projectDefinition }: Props): ReactElement => {
  const { t } = useTranslation("definition");

  const { objectId } = useSearch<LocationGenerics>();

  const objectDefinition = projectDefinition.objects.find(
    (object) => object.id === objectId
  );

  if (!objectDefinition) {
    return (
      <Card>
        <Text>{t("selectObjectDefinition")}</Text>
      </Card>
    );
  }

  const handleRemoveClick = () => {
    projectDefinition.removeObject(objectDefinition);
  };

  const handleCopyClick = () => {
    projectDefinition.copyObject(
      objectDefinition,
      t("copyName", { name: objectDefinition.name })
    );
  };

  return (
    <Col>
      <ObjectForm objectDefinition={objectDefinition} />
      <Button auto onClick={handleRemoveClick}>
        {t("removeObject")}
      </Button>
      <Button auto onClick={handleCopyClick}>
        {t("copyObject")}
      </Button>
      <FieldsList objectDefinition={objectDefinition} />
      <FieldCard objectDefinition={objectDefinition} />
    </Col>
  );
};
