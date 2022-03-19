import { ReactElement } from "react";
import { useTranslation } from "react-i18next";

export const TopBar = (): ReactElement => {
  const { t } = useTranslation("workspace");
  return (
    <div>
      <p>{t("WorkspaceTopBar")}</p>
    </div>
  );
};
