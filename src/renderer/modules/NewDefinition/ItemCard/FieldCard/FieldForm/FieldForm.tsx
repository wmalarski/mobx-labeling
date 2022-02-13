import {
  Container,
  FormElement,
  Input,
  Radio,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { Item } from "@react-stately/collections";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "renderer/components";
import { FieldDefinitionChange } from "renderer/models/base";
import { DefinitionKind, FieldDefinition } from "renderer/models/definition";
import { definitionKinds } from "./FieldForm.utils";

type Props = {
  fieldDefinition: Instance<typeof FieldDefinition>;
  onKindChange: (kind: DefinitionKind) => void;
};

export const FieldForm = observer(
  ({ fieldDefinition, onKindChange }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handleNameChange = (event: ChangeEvent<FormElement>) => {
      fieldDefinition.setName(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<FormElement>) => {
      fieldDefinition.setDescription(event.target.value);
    };

    const handleGroupChange = (value: string | number) => {
      const change = value as Instance<typeof FieldDefinitionChange>;
      fieldDefinition.setChange(change);
    };

    const handleKindChange = (key: string | number) => {
      onKindChange(key as DefinitionKind);
    };

    return (
      <Container>
        <Row>
          <Text h3>{t("fieldFormHeader")}</Text>
        </Row>
        <Spacer y={1} />
        <Row>
          <Input
            value={fieldDefinition.name}
            onChange={handleNameChange}
            labelLeft={t("namePlaceholder")}
            placeholder={t("namePlaceholder")}
            aria-label={t("namePlaceholder")}
          />
        </Row>
        <Spacer y={0.5} />
        <Row>
          <Input
            value={fieldDefinition.description}
            onChange={handleDescriptionChange}
            labelLeft={t("descriptionPlaceholder")}
            placeholder={t("descriptionPlaceholder")}
            aria-label={t("descriptionPlaceholder")}
          />
        </Row>
        <Spacer y={1} />
        <Row>
          <Radio.Group
            value={fieldDefinition.change}
            onChange={handleGroupChange}
            row
          >
            <Radio value="EveryFrame">
              {t("everyFrameKey")}
              <Radio.Description>
                {t("everyFrameDescription")}
              </Radio.Description>
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
        </Row>
        <Spacer y={1} />
        <Row>
          <Select
            label={t("kindLabel")}
            placeholder={t("kindPlaceholder")}
            selectedKey={fieldDefinition.kind}
            onSelectionChange={handleKindChange}
          >
            {definitionKinds.map((kind) => (
              <Item key={kind}>{kind}</Item>
            ))}
          </Select>
        </Row>
      </Container>
    );
  }
);
