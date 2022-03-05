import {
  Button,
  Grid,
  Input,
  Radio,
  Select,
  Spacer,
  Text,
} from "@geist-ui/core";
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
  itemDefinition: Instance<typeof ItemDefinition>;
  fieldDefinition: Instance<typeof FieldDefinition>;
  onSelectedFieldChange: (fieldId: string | null) => void;
};

export const FieldForm = observer(
  ({
    itemDefinition,
    fieldDefinition,
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
      <Grid.Container gap={0}>
        <Grid alignItems="center" justify="space-between">
          <div>
            <Text h4>{t("fieldFormHeader")}</Text>
          </div>
          <div>
            <Grid.Container justify="flex-end" alignItems="center" gap={1}>
              <Grid>
                <Button
                  auto
                  color="secondary"
                  onClick={handleCopyClick}
                  icon={<CopyIcon />}
                >
                  {t("copyField")}
                </Button>
              </Grid>
              <Grid>
                <Button
                  auto
                  color="error"
                  onClick={handleRemoveClick}
                  icon={<TrashIcon />}
                >
                  {t("removeField")}
                </Button>
              </Grid>
            </Grid.Container>
          </div>
        </Grid>
        <Spacer h={0.5} />
        <Grid>
          <Input
            width="100%"
            value={fieldDefinition.name}
            onChange={handleNameChange}
            label={t("namePlaceholder")}
            placeholder={t("namePlaceholder")}
            aria-label={t("namePlaceholder")}
          />
        </Grid>
        <Spacer h={0.5} />
        <Grid>
          <Input
            width="100%"
            value={fieldDefinition.description}
            onChange={handleDescriptionChange}
            label={t("descriptionPlaceholder")}
            placeholder={t("descriptionPlaceholder")}
            aria-label={t("descriptionPlaceholder")}
          />
        </Grid>
        <Spacer h={1} />
        <Grid>
          <Radio.Group
            value={fieldDefinition.change}
            onChange={handleGroupChange}
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
        <Spacer h={1} />
        <Grid>
          <Select
            aria-label={t("kindLabel")}
            placeholder={t("kindPlaceholder")}
            value={fieldDefinition.kind}
            onChange={handleKindChange}
          >
            {definitionKinds.map((kind) => (
              <Select.Option key={kind}>{kind}</Select.Option>
            ))}
          </Select>
        </Grid>
      </Grid.Container>
    );
  }
);
