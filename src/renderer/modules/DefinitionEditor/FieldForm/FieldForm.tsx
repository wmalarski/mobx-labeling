import { Button, Grid, Input, Radio, Select, Text } from "@geist-ui/core";
import { CopyIcon, TrashIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import {
  DefinitionKind,
  definitionKinds,
  FieldDefinition,
  FieldDefinitionChange,
  ItemDefinition,
} from "renderer/models";

type Props = {
  fieldDefinition: Instance<typeof FieldDefinition>;
  itemDefinition: Instance<typeof ItemDefinition>;
  onSelectedFieldChange: (fieldId: string | null) => void;
};

export const FieldForm = observer(
  ({
    fieldDefinition,
    itemDefinition,
    onSelectedFieldChange,
  }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handleRemoveClick = () => {
      itemDefinition.removeField(fieldDefinition);
      const selected = itemDefinition.fields.at(0)?.id ?? null;
      onSelectedFieldChange(selected);
    };

    const handleCopyClick = () => {
      const name = t("copyName", { name: fieldDefinition.name });
      const copy = itemDefinition.copyField(fieldDefinition, name);
      onSelectedFieldChange(copy.id);
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
      fieldDefinition.setName(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
      fieldDefinition.setDescription(event.target.value);
    };

    const handleGroupChange = (value: string | number) => {
      const change = value as Instance<typeof FieldDefinitionChange>;
      fieldDefinition.setChange(change);
    };

    const handleKindChange = (key: string | string[]) => {
      itemDefinition.changeKind(fieldDefinition, key as DefinitionKind);
    };

    return (
      <Grid.Container gap={1}>
        <Grid xs={9} alignItems="center">
          <Text h4>{t("fieldFormHeader")}</Text>
        </Grid>
        <Grid xs={15} alignItems="center" justify="space-between">
          <Grid.Container justify="flex-end" alignItems="center" gap={1}>
            <Grid>
              <Button
                auto
                color="secondary"
                icon={<CopyIcon />}
                onClick={handleCopyClick}
              >
                {t("copyField")}
              </Button>
            </Grid>
            <Grid>
              <Button
                auto
                color="error"
                icon={<TrashIcon />}
                onClick={handleRemoveClick}
              >
                {t("removeField")}
              </Button>
            </Grid>
          </Grid.Container>
        </Grid>
        <Grid xs={24}>
          <Input
            aria-label={t("namePlaceholder")}
            label={t("namePlaceholder")}
            onChange={handleNameChange}
            placeholder={t("namePlaceholder")}
            value={fieldDefinition.name}
            width="100%"
          />
        </Grid>
        <Grid xs={24}>
          <Input
            aria-label={t("descriptionPlaceholder")}
            label={t("descriptionPlaceholder")}
            onChange={handleDescriptionChange}
            placeholder={t("descriptionPlaceholder")}
            value={fieldDefinition.description}
            width="100%"
          />
        </Grid>
        <Grid xs={24}>
          <Select
            aria-label={t("kindLabel")}
            onChange={handleKindChange}
            placeholder={t("kindPlaceholder")}
            value={fieldDefinition.kind}
            width="100%"
          >
            {definitionKinds.map((kind) => (
              <Select.Option key={kind} value={kind}>
                {kind}
              </Select.Option>
            ))}
          </Select>
        </Grid>
        <Grid xs={24}>
          <Radio.Group
            onChange={handleGroupChange}
            useRow
            value={fieldDefinition.change}
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
        </Grid>
      </Grid.Container>
    );
  }
);
