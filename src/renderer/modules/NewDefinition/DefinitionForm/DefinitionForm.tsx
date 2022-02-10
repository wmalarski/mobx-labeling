import { Col, FormElement, Input } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ProjectDefinition } from "renderer/models/definition";

type Props = {
  definition: Instance<typeof ProjectDefinition>;
};

export const DefinitionForm = observer(
  ({ definition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handleNameChange = (event: ChangeEvent<FormElement>) => {
      definition.setName(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<FormElement>) => {
      definition.setDescription(event.target.value);
    };

    return (
      <Col>
        <Input
          value={definition.name}
          onChange={handleNameChange}
          placeholder={t("namePlaceholder")}
        />
        <Input
          value={definition.description}
          onChange={handleDescriptionChange}
          placeholder={t("descriptionPlaceholder")}
        />
      </Col>
    );
  }
);
