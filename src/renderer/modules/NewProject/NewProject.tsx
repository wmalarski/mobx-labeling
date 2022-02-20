import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { IntroLayout, StyledLink } from "renderer/components";
import { routePaths } from "renderer/utils/routes";
import { Header } from "../Header/Header";

export const NewProject = (): ReactElement => {
  const { t } = useTranslation("definition");

  return (
    <IntroLayout>
      <Header />
      <StyledLink to={routePaths.definitions}>
        {t("definitionsHeader")}
      </StyledLink>
      <StyledLink to={routePaths.workspace} search={{ project: "project123" }}>
        Workspace
      </StyledLink>
    </IntroLayout>
  );
};
