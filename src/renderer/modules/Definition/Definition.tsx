import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Link, useMatch } from "react-location";
import { IntroLayout } from "renderer/components";
import { LocationGenerics, routePaths } from "renderer/utils/routes";

export const Definition = (): ReactElement => {
  const { t } = useTranslation("definition");

  const { params } = useMatch<LocationGenerics>();

  return (
    <IntroLayout>
      <p>{t("definitionHeader")}</p>
      <p>{params.definitionId}</p>
      <Link to={routePaths.definitions}>definitions</Link>
    </IntroLayout>
  );
};
