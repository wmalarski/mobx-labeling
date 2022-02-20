import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useMatch } from "react-location";
import { IntroLayout, StyledLink } from "renderer/components";
import { LocationGenerics, routePaths } from "renderer/utils/routes";
import { Header } from "../Header/Header";

export const Definition = (): ReactElement => {
  const { t } = useTranslation("definition");

  const { params } = useMatch<LocationGenerics>();

  return (
    <IntroLayout>
      <Header />
      <p>{t("definitionHeader")}</p>
      <p>{params.definitionId}</p>
      <StyledLink to={routePaths.definitions}>
        {t("definitionsList")}
      </StyledLink>
    </IntroLayout>
  );
};
