import { Page, Text } from "@geist-ui/core";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMatch } from "react-location";
import { StyledLink } from "renderer/components";
import { WorkspaceStore } from "renderer/models";
import { LocationGenerics, routePaths } from "renderer/utils/routes";
import { WorkspaceLayout } from "./WorkspaceLayout/WorkspaceLayout";

export const Workspace = (): ReactElement => {
  const { t } = useTranslation("workspace");

  const { data } = useMatch<LocationGenerics>();

  const [workspaceStore] = useState(() => {
    if (!data.project) return null;
    return WorkspaceStore.create({
      batch: data.batch,
      project: data.project,
    });
  });

  if (!workspaceStore) {
    return (
      <Page>
        <Page.Content>
          <Text>{t("error")}</Text>
          <StyledLink to={routePaths.home}>{t("errorLink")}</StyledLink>
        </Page.Content>
      </Page>
    );
  }

  return <WorkspaceLayout />;
};
