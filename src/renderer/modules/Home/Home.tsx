import { Text } from "@nextui-org/react";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-location";
import { IntroLayout } from "renderer/components/IntroLayout/IntroLayout";
import { routePaths } from "../../utils/routes";
import { Recent } from "./Recent/Recent";

export const Home = (): ReactElement => {
  const { t } = useTranslation("common");

  return (
    <IntroLayout>
      <Text h1>{t("title")}</Text>
      <div>
        <Link to={routePaths.home} activeOptions={{ exact: true }}>
          {t("navHome")}
        </Link>
        <Link to={routePaths.newProject}>{t("navNewProject")}</Link>
        <Link to={routePaths.definitions}>{t("navDefinitions")}</Link>
      </div>
      <Recent />
    </IntroLayout>
  );
};
