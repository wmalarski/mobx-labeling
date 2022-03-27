import { Button, Grid, Page, Text } from "@geist-ui/core";
import { PlusIcon, RowsIcon } from "@radix-ui/react-icons";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-location";
import { HomeStore } from "renderer/models";
import { Header } from "../../modules/Header/Header";
import { routePaths } from "../../utils/routes";
import { Recent } from "./Recent/Recent";

export const Home = (): ReactElement => {
  const { t } = useTranslation("home");

  const navigate = useNavigate();

  const [homeStore] = useState(() => {
    return HomeStore.create({
      projects: {},
    });
  });

  const handleDefinitionsClick = () => {
    navigate({
      to: routePaths.definitions,
    });
  };

  const handleNewProjectClick = () => {
    navigate({
      to: routePaths.newProject,
    });
  };

  return (
    <Page>
      <Page.Header>
        <Header />
      </Page.Header>
      <Page.Content>
        <Grid.Container gap={1} alignItems="center">
          <Grid>
            <Text h2>{t("recentHeader")}</Text>
          </Grid>
          <Grid style={{ flexGrow: 1 }} />
          <Grid>
            <Button
              color="primary"
              onClick={handleDefinitionsClick}
              icon={<RowsIcon />}
            >
              {t("navDefinitions")}
            </Button>
          </Grid>
          <Grid>
            <Button
              color="primary"
              onClick={handleNewProjectClick}
              icon={<PlusIcon />}
            >
              {t("navNewProject")}
            </Button>
          </Grid>
          <Grid xs={24}>
            <Recent projectsList={homeStore.projects} />
          </Grid>
        </Grid.Container>
      </Page.Content>
    </Page>
  );
};
