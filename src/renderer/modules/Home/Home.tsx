import { Button, Text } from "@nextui-org/react";
import { getSnapshot } from "mobx-state-tree";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-location";
import { IntroLayout } from "renderer/components";
import { mockProjectDefinition } from "renderer/tests/mocks";
import { routePaths } from "../../utils/routes";
import { Recent } from "./Recent/Recent";

export const Home = (): ReactElement => {
  const { t } = useTranslation("common");

  const handleSaveClick = async () => {
    const snapshot = getSnapshot(mockProjectDefinition());
    const result = await window.electron.ipcRenderer.saveDefinition(snapshot);
    console.log("result", { result });
  };

  return (
    <IntroLayout>
      <Text h1>{t("title")}</Text>
      <div>
        <Link to={routePaths.home} activeOptions={{ exact: true }}>
          {t("navHome")}
        </Link>
        <Link to={routePaths.newProject}>{t("navNewProject")}</Link>
        <Link to={routePaths.definitions}>{t("navDefinitions")}</Link>
        <Button onClick={handleSaveClick}>Save</Button>
      </div>
      <Recent />
    </IntroLayout>
  );
};
