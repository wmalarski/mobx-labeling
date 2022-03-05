import { Button, Grid, Text } from "@geist-ui/core";
import { GearIcon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { StyledLink } from "renderer/components";
import { routePaths } from "renderer/utils/routes";

export const Header = (): ReactElement => {
  const { t } = useTranslation("common");
  return (
    <Grid justify="space-between" alignItems="center">
      <StyledLink to={routePaths.home}>
        <Text h1>{t("title")}</Text>
      </StyledLink>
      <Button
        auto
        icon={<GearIcon />}
        css={{
          paddingLeft: "$7",
          paddingRight: "$7",
          backgroundColor: "$accents2",
        }}
      >
        {t("settingsButton")}
      </Button>
    </Grid>
  );
};
