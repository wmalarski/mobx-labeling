import { Button, Grid, Page, Text } from "@geist-ui/core";
import { PlusIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-location";
import { DefinitionsStore } from "renderer/models";
import { routePaths } from "renderer/utils/routes";
import { Header } from "../../modules/Header/Header";
import { DefinitionsList } from "./DefinitionsList/DefinitionsList";

export const Definitions = observer((): ReactElement => {
  const { t } = useTranslation("definition");

  const navigate = useNavigate();

  const [definitionsStore] = useState(() => {
    return DefinitionsStore.create({
      definitions: {},
    });
  });

  const handleRemoveClick = (definitionId: string) => {
    definitionsStore.remove(definitionId);
  };

  const handleNewDefinitionClick = () => {
    navigate({
      to: routePaths.newDefinition,
    });
  };

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
          <DefinitionsList
            definitionsList={definitionsStore.definitions}
            onRemoveClick={handleRemoveClick}
          />
        </Grid.Container>
      </Page.Content>
    </Page>
  );
});
