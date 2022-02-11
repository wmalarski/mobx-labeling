import { Button, Col, FormElement, Input } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useSearch } from "react-location";
import {
  ObjectDefinition,
  ProjectDefinition,
} from "renderer/models/definition";
import { LocationGenerics } from "renderer/utils/routes";
import { FieldsList } from "./FieldsList/FieldsList";

type Props = {
  projectDefinition: Instance<typeof ProjectDefinition>;
  objectDefinition: Instance<typeof ObjectDefinition>;
};

export const ObjectForm = observer(
  ({ objectDefinition, projectDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const { fieldId } = useSearch<LocationGenerics>();

    const handleNameChange = (event: ChangeEvent<FormElement>) => {
      objectDefinition.setName(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<FormElement>) => {
      objectDefinition.setDescription(event.target.value);
    };

    const handleRemoveClick = () => {
      projectDefinition.removeObject(objectDefinition);
    };

    const fieldDefinition = objectDefinition.fields.find(
      (field) => field.id === fieldId
    );

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
        <Button auto onClick={handleRemoveClick}>
          {t("removeObject")}
        </Button>
        <FieldsList objectDefinition={objectDefinition} />
      </Col>
    );
  }
);
