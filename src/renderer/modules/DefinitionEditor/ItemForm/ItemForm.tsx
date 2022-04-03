import { Button, Grid, Input, Text } from "@geist-ui/core";
import { CopyIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ItemDefinition, ProjectDefinition } from "renderer/models";

type Props = {
  itemDefinition: Instance<typeof ItemDefinition>;
  onSelectedFieldChange: (fieldId: string | null) => void;
  onSelectedItemChange: (itemId: string | null) => void;
  projectDefinition: Instance<typeof ProjectDefinition>;
};

export const ItemForm = observer(
  ({
    itemDefinition,
    onSelectedFieldChange,
    onSelectedItemChange,
    projectDefinition,
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
                icon={<PlusIcon />}
                onClick={handlePlusClick}
              >
                {t("addNewField")}
              </Button>
            </Grid>
            <Grid>
              <Button
                auto
                color="secondary"
                icon={<CopyIcon />}
                onClick={handleCopyClick}
              >
                {t("copyItem")}
              </Button>
            </Grid>
            <Grid>
              <Button
                auto
                color="error"
                icon={<TrashIcon />}
                onClick={handleRemoveClick}
              >
                {t("removeItem")}
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
            value={itemDefinition.name}
            width="100%"
          />
        </Grid>
        <Grid xs={24}>
          <Input
            aria-label={t("descriptionPlaceholder")}
            label={t("descriptionPlaceholder")}
            onChange={handleDescriptionChange}
            placeholder={t("descriptionPlaceholder")}
            value={itemDefinition.description}
            width="100%"
          />
        </Grid>
      </Grid.Container>
    );
  }
);
