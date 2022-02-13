import { Col, FormElement, Input } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ItemDefinition } from "renderer/models/definition";

type Props = {
  itemDefinition: Instance<typeof ItemDefinition>;
};

export const ItemForm = observer(({ itemDefinition }: Props): ReactElement => {
  const { t } = useTranslation("definition");

  const handleNameChange = (event: ChangeEvent<FormElement>) => {
    itemDefinition.setName(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<FormElement>) => {
    itemDefinition.setDescription(event.target.value);
  };

  return (
    <Col>
      <Input
        value={itemDefinition.name}
        onChange={handleNameChange}
        labelPlaceholder={t("namePlaceholder")}
      />
      <Input
        value={itemDefinition.description}
        onChange={handleDescriptionChange}
        labelPlaceholder={t("descriptionPlaceholder")}
      />
    </Col>
  );
});
