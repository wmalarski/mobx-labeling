import { Col, FormElement, Input, Radio } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { FieldDefinitionChange } from "renderer/models/base";
import { FieldDefinition } from "renderer/models/definition";

type Props = {
  fieldDefinition: Instance<typeof FieldDefinition>;
};

export const FieldForm = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handleNameChange = (event: ChangeEvent<FormElement>) => {
      fieldDefinition.setName(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<FormElement>) => {
      fieldDefinition.setDescription(event.target.value);
    };

    const handleGroupChange = (value: string | number) => {
      if (typeof value === "number") return;
      const change = value as Instance<typeof FieldDefinitionChange>;
      fieldDefinition.setChange(change);
    };

    return (
      <Col>
        <Input
          value={fieldDefinition.name}
          onChange={handleNameChange}
          labelPlaceholder={t("namePlaceholder")}
        />
        <Input
          value={fieldDefinition.description}
          onChange={handleDescriptionChange}
          labelPlaceholder={t("descriptionPlaceholder")}
        />
        <Radio.Group
          value={fieldDefinition.change}
          onChange={handleGroupChange}
          row
        >
          <Radio value="EveryFrame">
            {t("everyFrameKey")}
            <Radio.Description>{t("everyFrameDescription")}</Radio.Description>
          </Radio>
          <Radio value="FrameChanges">
            {t("frameChangesKey")}
            <Radio.Desc>{t("frameChangesDescription")}</Radio.Desc>
          </Radio>
          <Radio value="Singleton">
            {t("singletonKey")}
            <Radio.Desc>{t("singletonDescription")}</Radio.Desc>
          </Radio>
        </Radio.Group>
      </Col>
    );
  }
);
