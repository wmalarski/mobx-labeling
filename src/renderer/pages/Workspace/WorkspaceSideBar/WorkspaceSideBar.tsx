import { ReactElement } from "react";
import { useTranslation } from "react-i18next";

export const WorkspaceSideBar = (): ReactElement => {
  const { t } = useTranslation("workspace");
  return (
    <div>
      <p>{t("WorkspaceSideBar")}</p>
    </div>
  );
};
