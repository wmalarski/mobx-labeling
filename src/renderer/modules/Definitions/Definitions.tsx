import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-location";
import { IntroLayout } from "renderer/components";
import { routePaths } from "renderer/utils/routes";

export const Definitions = (): ReactElement => {
  const { t } = useTranslation("definition");

  return (
    <IntroLayout>
      <p>{t("definitionsHeader")}</p>
      <Link to={routePaths.definition("First")}>First</Link>
      <Link to={routePaths.home}>Home</Link>
      <Link to={routePaths.newDefinition}>{t("navNewDefinition")}</Link>
      <Link to={routePaths.newProject}>New Project</Link>
    </IntroLayout>
  );
};
