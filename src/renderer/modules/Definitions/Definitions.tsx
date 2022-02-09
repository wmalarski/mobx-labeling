import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-location";
import { IntroLayout } from "renderer/components/IntroLayout/IntroLayout";
import { routePaths } from "renderer/utils/routes";

export const Definitions = (): ReactElement => {
  const { t } = useTranslation("common");

  return (
    <IntroLayout>
      <p>Definitions</p>
      <Link to={routePaths.definition("First")}>First</Link>
      <Link to={routePaths.home}>Home</Link>
      <Link to={routePaths.newDefinition}>{t("navNewDefinition")}</Link>
      <Link to={routePaths.newProject}>New Project</Link>
    </IntroLayout>
  );
};
