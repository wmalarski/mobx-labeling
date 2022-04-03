import { AutoComplete, Grid, Input } from "@geist-ui/core";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { NewProjectStore } from "renderer/models";
import { useSaveDialog } from "renderer/services/resources/useSaveDialog";

type Props = {
  newProjectStore: Instance<typeof NewProjectStore>;
};

export const ProjectDetails = observer(
  ({ newProjectStore }: Props): ReactElement => {
    const { t } = useTranslation("project");

    const { open: openSaveDialog } = useSaveDialog({
      onReturn: (result) => {
        if (!result.filePath) return;
        newProjectStore.setProjectPath(result.filePath);
      },
    });

    const handleInputChange = (query: string) => {
      newProjectStore.definitions.load({ query });
    };

    const handlePathChange = (event: ChangeEvent<HTMLInputElement>) => {
      newProjectStore.setProjectPath(event.target.value);
    };

    const handleSelectionChange = (key: string | number) => {
      const selectedDefinition = newProjectStore.definitions.definitions.find(
        (definition) => definition.name === key
      );

      selectedDefinition &&
        newProjectStore.setDefinitionId(selectedDefinition.id);
    };

    const handleSaveClick = () => {
      openSaveDialog({
        title: t("projectLocationDialog"),
        filters: [{ extensions: ["labels"], name: t("filetypeName") }],
      });
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
      newProjectStore.setName(event.target.value);
    };

    const handleBatchSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
      const size = Number(event.target.valueAsNumber.toFixed(0));
      newProjectStore.setBatchSize(size);
    };

    return (
      <Grid.Container gap={0.5}>
        <Grid xs={24}>
          <Input
            aria-label={t("namePlaceholder")}
            label={t("namePlaceholder")}
            onChange={handleNameChange}
            placeholder={t("namePlaceholder")}
            value={newProjectStore.name}
            width="100%"
          />
        </Grid>
        <Grid xs={24}>
          <AutoComplete
            aria-label={t("selectDefinitionLabel")}
            disableFreeSolo
            options={newProjectStore.definitions.definitions.map(
              (definition) => ({
                key: definition.id,
                label: definition.name,
                value: definition.name,
              })
            )}
            onSearch={handleInputChange}
            onSelect={handleSelectionChange}
            placeholder={t("selectDefinitionLabel")}
            value={newProjectStore.definitions.query}
            width="100%"
          />
        </Grid>
        <Grid xs={24}>
          <Input
            aria-label={t("locationLabel")}
            iconClickable
            iconRight={<Pencil1Icon aria-label={t("browseLocation")} />}
            label={t("locationLabel")}
            onChange={handlePathChange}
            onIconClick={handleSaveClick}
            placeholder={t("locationLabel")}
            value={newProjectStore.projectPath}
            width="100%"
          />
        </Grid>
        <Grid xs={24}>
          <Input
            aria-label={t("batchSizePlaceholder")}
            label={t("batchSizePlaceholder")}
            min={10}
            onChange={handleBatchSizeChange}
            placeholder={t("batchSizePlaceholder")}
            step={1}
            value={String(newProjectStore.batchSize)}
            width="100%"
          />
        </Grid>
      </Grid.Container>
    );
  }
);
