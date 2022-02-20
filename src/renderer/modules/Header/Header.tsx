import { Button, Row, Text } from "@nextui-org/react";
import { GearIcon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { StyledLink } from "renderer/components";
import { routePaths } from "renderer/utils/routes";

export const Header = (): ReactElement => {
  const { t } = useTranslation("common");
  return (
    <Row justify="space-between" align="center">
      <StyledLink to={routePaths.home}>
        <Text h1>{t("title")}</Text>
      </StyledLink>
      <Button
        auto
        light
        icon={<GearIcon />}
        css={{
          paddingLeft: "$7",
          paddingRight: "$7",
          backgroundColor: "$accents2",
        }}
      >
        {t("settingsButton")}
      </Button>
    </Row>
  );
};
