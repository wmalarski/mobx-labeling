import { Grid, Input, Pagination, Text } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { DefinitionsList as DefinitionsListModel } from "renderer/models";
import { DefinitionsItem } from "./DefinitionsItem/DefinitionsItem";

type Props = {
  definitionsList: Instance<typeof DefinitionsListModel>;
  onRemoveClick: (definitionId: string) => void;
};

export const DefinitionsList = observer(
  ({ definitionsList, onRemoveClick }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const handlePageChange = (page: number) => {
      definitionsList.load({ page: page - 1 });
    };

    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
      definitionsList.load({ page: 0, query: event.target.value });
    };

    const handleRemoveClick = (definitionId: string) => () => {
      onRemoveClick(definitionId);
    };

    return (
      <Grid.Container gap={1} justify="space-between" alignItems="center">
        <Grid xs={24}>
          <Input
            aria-label={t("searchPlaceholder")}
            clearable
            label={t("searchPlaceholder")}
            onChange={handleQueryChange}
            placeholder={t("searchPlaceholder")}
            value={definitionsList.query}
            width="100%"
          />
        </Grid>
        {definitionsList.definitions.map((definitionEntry) => (
          <Grid xs={24} key={definitionEntry.id}>
            <DefinitionsItem
              definitionEntry={definitionEntry}
              onRemoveClick={handleRemoveClick(definitionEntry.id)}
            />
          </Grid>
        ))}
        {definitionsList.error && (
          <Grid xs={24}>
            <Text h4 type="error">
              {t("loadingError")}
            </Text>
          </Grid>
        )}
        <Grid xs={24} justify="center">
          <Pagination
            count={definitionsList.totalPages}
            onChange={handlePageChange}
            page={definitionsList.page + 1}
          />
        </Grid>
      </Grid.Container>
    );
  }
);
