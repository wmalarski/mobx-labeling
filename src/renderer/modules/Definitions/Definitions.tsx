import { Button, Grid, Input, Page, Pagination, Text } from "@geist-ui/core";
import { PlusIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { ChangeEvent, ReactElement, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-location";
import { DefinitionsList } from "renderer/models";
import { routePaths } from "renderer/utils/routes";
import { Header } from "../Header/Header";
import { DefinitionsItem } from "./DefinitionsItem/DefinitionsItem";

export const Definitions = observer((): ReactElement => {
  const { t } = useTranslation("definition");

  const navigate = useNavigate();

  const [definitionsList] = useState(() => {
    return DefinitionsList.create({});
  });

  const handlePageChange = useCallback(
    (page: number) => {
      definitionsList.load({ page: page - 1 });
    },
    [definitionsList]
  );

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    definitionsList.load({ page: 0, query: event.target.value });
  };

  const handleRemoveClick = (definitionId: string) => () => {
    definitionsList.remove(definitionId);
  };

  const handleNewDefinitionClick = () => {
    navigate({
      to: routePaths.newDefinition,
    });
  };

  console.log({
    count: definitionsList.totalPages,
    page: definitionsList.page,
  });

  return (
    <Page>
      <Page.Header>
        <Header />
      </Page.Header>
      <Page.Content>
        <Grid.Container gap={1} justify="space-between" alignItems="center">
          <Grid>
            <Text h2>{t("definitionsHeader")}</Text>
          </Grid>
          <Grid justify="flex-end">
            <Button
              color="primary"
              onClick={handleNewDefinitionClick}
              icon={<PlusIcon />}
            >
              {t("newDefinitionButton")}
            </Button>
          </Grid>
          <Grid xs={24}>
            <Input
              width="100%"
              clearable
              value={definitionsList.query}
              onChange={handleQueryChange}
              label={t("searchPlaceholder")}
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchPlaceholder")}
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
              page={definitionsList.page + 1}
              onChange={handlePageChange}
            />
          </Grid>
        </Grid.Container>
      </Page.Content>
    </Page>
  );
});
