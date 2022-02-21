import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { IntroLayout, StyledLink } from "renderer/components";
import { routePaths } from "../../utils/routes";
import { Header } from "../Header/Header";
import { Recent } from "./Recent/Recent";

export const Home = (): ReactElement => {
  const { t } = useTranslation("common");

  return (
    <IntroLayout>
      <Header />
      <div>
        <StyledLink to={routePaths.definitions}>
          {t("navDefinitions")}
        </StyledLink>
        <StyledLink to={routePaths.newProject}>{t("navNewProject")}</StyledLink>
      </div>
      <Recent />
    </IntroLayout>
  );
};
