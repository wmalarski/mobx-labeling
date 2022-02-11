import { Col, FormElement, Input } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ProjectDefinition } from "renderer/models/definition";

type Props = {
  projectDefinition: Instance<typeof ProjectDefinition>;
};

export const DefinitionForm = observer(
  ({ projectDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handleNameChange = (event: ChangeEvent<FormElement>) => {
      projectDefinition.setName(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<FormElement>) => {
      projectDefinition.setDescription(event.target.value);
    };

    return (
      <Col>
        <Input
          value={projectDefinition.name}
          onChange={handleNameChange}
          labelPlaceholder={t("namePlaceholder")}
        />
        <Input
          value={projectDefinition.description}
          onChange={handleDescriptionChange}
          labelPlaceholder={t("descriptionPlaceholder")}
        />
      </Col>
    );
  }
);
