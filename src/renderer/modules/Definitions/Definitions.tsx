import { Button, Grid, Input, Pagination, Spacer, Text } from "@geist-ui/core";
import { PlusIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { ChangeEvent, Fragment, ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-location";
import { IntroLayout } from "renderer/components";
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

  const handlePageChange = (page: number) => {
    definitionsList.load({ page: page - 1 });
  };

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

  return (
    <IntroLayout>
      <Header />
      <Spacer h={1} />
      <Grid alignItems="center" justify="space-between">
        <Text h2>{t("definitionsHeader")}</Text>
        <Button
          color="primary"
          onClick={handleNewDefinitionClick}
          icon={<PlusIcon />}
        >
          {t("newDefinitionButton")}
        </Button>
      </Grid>
      <Spacer h={1} />
      <Grid>
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
      <Spacer h={1} />
      {definitionsList.definitions.map((definitionEntry) => (
        <Fragment key={definitionEntry.id}>
          <Grid>
            <DefinitionsItem
              definitionEntry={definitionEntry}
              onRemoveClick={handleRemoveClick(definitionEntry.id)}
            />
          </Grid>
          <Spacer h={0.5} />
        </Fragment>
      ))}
      {definitionsList.error && (
        <Text h4 type="error">
          {t("loadingError")}
        </Text>
      )}
      <Spacer h={0.5} />
      <Grid justify="center">
        <Pagination
          count={definitionsList.totalPages}
          page={definitionsList.page}
          onChange={handlePageChange}
        />
      </Grid>
      <Spacer h={1} />
    </IntroLayout>
  );
});
