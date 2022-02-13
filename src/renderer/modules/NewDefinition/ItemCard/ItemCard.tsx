import { Button, Card, Col, Text } from "@nextui-org/react";
import { Instance } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useSearch } from "react-location";
import { ProjectDefinition } from "renderer/models/definition";
import { LocationGenerics } from "renderer/utils/routes";
import { FieldCard } from "./FieldCard/FieldCard";
import { FieldsList } from "./FieldsList/FieldsList";
import { ItemForm } from "./ItemForm/ItemForm";

type Props = {
  projectDefinition: Instance<typeof ProjectDefinition>;
};

export const ItemCard = ({ projectDefinition }: Props): ReactElement => {
  const { t } = useTranslation("definition");

  const { itemId } = useSearch<LocationGenerics>();

  const itemDefinition = projectDefinition.items.find(
    (item) => item.id === itemId
  );

  if (!itemDefinition) {
    return (
      <Card>
        <Text>{t("selectItemDefinition")}</Text>
      </Card>
    );
  }

  const handleRemoveClick = () => {
    projectDefinition.removeItem(itemDefinition);
  };

  const handleCopyClick = () => {
    projectDefinition.copyItem(
      itemDefinition,
      t("copyName", { name: itemDefinition.name })
    );
  };

  return (
    <Col>
      <ItemForm itemDefinition={itemDefinition} />
      <Button auto onClick={handleRemoveClick}>
        {t("removeItem")}
      </Button>
      <Button auto onClick={handleCopyClick}>
        {t("copyItem")}
      </Button>
      <FieldsList itemDefinition={itemDefinition} />
      <FieldCard itemDefinition={itemDefinition} />
    </Col>
  );
};
