import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-location";
import { IntroLayout } from "renderer/components";
import { routePaths } from "renderer/utils/routes";

export const NewProject = (): ReactElement => {
  const { t } = useTranslation("definition");

  return (
    <IntroLayout>
      <p>NewProject</p>
      <Link to={routePaths.definitions}>{t("definitionsHeader")}</Link>
      <Link to={routePaths.workspace} search={{ project: "project123" }}>
        Workspace
      </Link>
    </IntroLayout>
  );
};
