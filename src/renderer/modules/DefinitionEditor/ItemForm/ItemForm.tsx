import { Button, Grid, Input, Text } from "@geist-ui/core";
import { CopyIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ItemDefinition, ProjectDefinition } from "renderer/models";

type Props = {
  itemDefinition: Instance<typeof ItemDefinition>;
  projectDefinition: Instance<typeof ProjectDefinition>;
  onSelectedItemChange: (itemId: string | null) => void;
  onSelectedFieldChange: (fieldId: string | null) => void;
};

export const ItemForm = observer(
  ({
    itemDefinition,
    projectDefinition,
    onSelectedItemChange,
    onSelectedFieldChange,
  }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
      itemDefinition.setName(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
      itemDefinition.setDescription(event.target.value);
    };

    const handleRemoveClick = () => {
      projectDefinition.removeItem(itemDefinition);
      const selected = projectDefinition.items.at(0)?.id ?? null;
      onSelectedItemChange(selected);
    };

    const handlePlusClick = () => {
      const field = itemDefinition.addNewField(t("defaultFieldName"));
      onSelectedFieldChange(field.id);
    };

    const handleCopyClick = () => {
      const name = t("copyName", { name: itemDefinition.name });
      const copy = projectDefinition.copyItem(itemDefinition, name);
      onSelectedItemChange(copy.id);
    };

    return (
      <Grid.Container gap={1}>
        <Grid xs={9} justify="space-between" alignItems="center">
          <Text h3>{t("itemFormHeader")}</Text>
        </Grid>
        <Grid xs={15} justify="space-between" alignItems="center">
          <Grid.Container justify="flex-end" alignItems="center" gap={1}>
            <Grid>
              <Button
                auto
                color="primary"
                onClick={handlePlusClick}
                icon={<PlusIcon />}
              >
                {t("addNewField")}
              </Button>
            </Grid>
            <Grid>
              <Button
                auto
                color="secondary"
                onClick={handleCopyClick}
                icon={<CopyIcon />}
              >
                {t("copyItem")}
              </Button>
            </Grid>
            <Grid>
              <Button
                auto
                color="error"
                onClick={handleRemoveClick}
                icon={<TrashIcon />}
              >
                {t("removeItem")}
              </Button>
            </Grid>
          </Grid.Container>
        </Grid>
        <Grid xs={24}>
          <Input
            width="100%"
            value={itemDefinition.name}
            onChange={handleNameChange}
            placeholder={t("namePlaceholder")}
            label={t("namePlaceholder")}
            aria-label={t("namePlaceholder")}
          />
        </Grid>
        <Grid xs={24}>
          <Input
            width="100%"
            value={itemDefinition.description}
            onChange={handleDescriptionChange}
            placeholder={t("descriptionPlaceholder")}
            label={t("descriptionPlaceholder")}
            aria-label={t("descriptionPlaceholder")}
          />
        </Grid>
      </Grid.Container>
    );
  }
);
