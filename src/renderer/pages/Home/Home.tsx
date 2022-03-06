import { Page } from "@geist-ui/core";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { StyledLink } from "renderer/components";
import { Header } from "../../modules/Header/Header";
import { routePaths } from "../../utils/routes";
import { Recent } from "./Recent/Recent";

export const Home = (): ReactElement => {
  const { t } = useTranslation("common");

  return (
    <Page>
      <Page.Header>
        <Header />
      </Page.Header>
      <Page.Content>
        <div>
          <StyledLink to={routePaths.definitions}>
            {t("navDefinitions")}
          </StyledLink>
          <StyledLink to={routePaths.newProject}>
            {t("navNewProject")}
          </StyledLink>
        </div>
        <Recent />
      </Page.Content>
    </Page>
  );
};
