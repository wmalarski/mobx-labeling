import { Button, Grid, Input, Loading, Text } from "@geist-ui/core";
import { Pencil1Icon, PlusIcon, RowsIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-location";
import { DefinitionStore } from "renderer/models";
import { routePaths } from "renderer/utils/routes";

type Props = {
  definitionStore: Instance<typeof DefinitionStore>;
  onSelectedItemChange: (itemId: string) => void;
};

export const DefinitionForm = observer(
  ({ definitionStore, onSelectedItemChange }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const navigate = useNavigate();

    const projectDefinition = definitionStore.projectDefinition;

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
      projectDefinition.setName(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
      projectDefinition.setDescription(event.target.value);
    };

    const handleSaveClick = () => {
      definitionStore.save();
    };

    const handlePlusClick = () => {
      const item = projectDefinition.addNewItem(t("defaultItemName"));
      onSelectedItemChange(item.id);
    };

    const handleBoBackClick = () => {
      navigate({
        to: routePaths.definitions,
      });
    };

    return (
      <Grid.Container gap={1}>
        <Grid xs={8} md={12} alignItems="center">
          <Text h2>{t("newDefinitionHeader")}</Text>
        </Grid>
        <Grid xs={16} md={12} alignItems="center" justify="space-between">
          <Grid.Container justify="flex-end" alignItems="center" gap={1}>
            <Grid>
              {definitionStore.state === "done" && (
                <Text type="success">{t("definitionSaved")}</Text>
              )}
              {definitionStore.state === "error" && (
                <Text type="error">{t("saveFailed")}</Text>
              )}
            </Grid>
            <Grid>
              <Button
                auto
                onClick={handlePlusClick}
                color="primary"
                icon={<PlusIcon />}
              >
                {t("addNewItem")}
              </Button>
            </Grid>
            <Grid>
              <Button
                auto
                color="primary"
                onClick={handleSaveClick}
                icon={<Pencil1Icon />}
              >
                {definitionStore.state === "pending" ? (
                  <Loading color="white" />
                ) : (
                  t("saveDefinition")
                )}
              </Button>
            </Grid>
            <Grid>
              <Button
                auto
                color="secondary"
                onClick={handleBoBackClick}
                icon={<RowsIcon />}
              >
                {t("definitionsList")}
              </Button>
            </Grid>
          </Grid.Container>
        </Grid>
        <Grid xs={24}>
          <Input
            width="100%"
            value={projectDefinition.name}
            onChange={handleNameChange}
            placeholder={t("namePlaceholder")}
            label={t("namePlaceholder")}
            aria-label={t("namePlaceholder")}
          />
        </Grid>
        <Grid xs={24}>
          <Input
            width="100%"
            value={projectDefinition.description}
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
