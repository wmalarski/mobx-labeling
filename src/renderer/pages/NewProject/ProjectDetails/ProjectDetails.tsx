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
            width="100%"
            label={t("namePlaceholder")}
            placeholder={t("namePlaceholder")}
            aria-label={t("namePlaceholder")}
            value={newProjectStore.name}
            onChange={handleNameChange}
          />
        </Grid>
        <Grid xs={24}>
          <AutoComplete
            width="100%"
            disableFreeSolo
            aria-label={t("selectDefinitionLabel")}
            placeholder={t("selectDefinitionLabel")}
            value={newProjectStore.definitions.query}
            onSearch={handleInputChange}
            onSelect={handleSelectionChange}
            options={newProjectStore.definitions.definitions.map(
              (definition) => ({
                key: definition.id,
                label: definition.name,
                value: definition.name,
              })
            )}
          />
        </Grid>
        <Grid xs={24}>
          <Input
            width="100%"
            label={t("locationLabel")}
            placeholder={t("locationLabel")}
            aria-label={t("locationLabel")}
            onChange={handlePathChange}
            value={newProjectStore.projectPath}
            iconClickable
            onIconClick={handleSaveClick}
            iconRight={<Pencil1Icon aria-label={t("browseLocation")} />}
          />
        </Grid>
        <Grid xs={24}>
          <Input
            width="100%"
            step={1}
            min={10}
            label={t("batchSizePlaceholder")}
            placeholder={t("batchSizePlaceholder")}
            aria-label={t("batchSizePlaceholder")}
            value={String(newProjectStore.batchSize)}
            onChange={handleBatchSizeChange}
          />
        </Grid>
      </Grid.Container>
    );
  }
);
