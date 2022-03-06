import { Text } from "@geist-ui/core";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";

export const Recent = (): ReactElement => {
  const { t } = useTranslation("home");
  return (
    <div>
      <Text h3>{t("recentHeader")}</Text>
    </div>
  );
};
