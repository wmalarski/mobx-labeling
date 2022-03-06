import { Button, Grid, Page, Text, useTheme } from "@geist-ui/core";
import { GearIcon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { StyledLink } from "renderer/components";
import { routePaths } from "renderer/utils/routes";

export const Header = (): ReactElement => {
  const { t } = useTranslation("common");
  const theme = useTheme();

  return (
    <Page.Header>
      <Grid.Container gap={1} alignItems="center" justify="space-between">
        <Grid>
          <StyledLink to={routePaths.home}>
            <Text h1 style={{ color: theme.palette.foreground }}>
              {t("title")}
            </Text>
          </StyledLink>
        </Grid>
        <Grid>
          <Button auto icon={<GearIcon />}>
            {t("settingsButton")}
          </Button>
        </Grid>
      </Grid.Container>
    </Page.Header>
  );
};
