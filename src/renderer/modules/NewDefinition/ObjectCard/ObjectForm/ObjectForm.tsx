import { Col, FormElement, Input } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ObjectDefinition } from "renderer/models/definition";

type Props = {
  objectDefinition: Instance<typeof ObjectDefinition>;
};

export const ObjectForm = observer(
  ({ objectDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handleNameChange = (event: ChangeEvent<FormElement>) => {
      objectDefinition.setName(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<FormElement>) => {
      objectDefinition.setDescription(event.target.value);
    };

    return (
      <Col>
        <Input
          value={objectDefinition.name}
          onChange={handleNameChange}
          labelPlaceholder={t("namePlaceholder")}
        />
        <Input
          value={objectDefinition.description}
          onChange={handleDescriptionChange}
          labelPlaceholder={t("descriptionPlaceholder")}
        />
      </Col>
    );
  }
);
