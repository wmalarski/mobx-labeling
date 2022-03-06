import { Page } from "@geist-ui/core";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMatch } from "react-location";
import { DefinitionStore } from "renderer/models";
import { LocationGenerics } from "renderer/utils/routes";
import { DefinitionEditor } from "../DefinitionEditor/DefinitionEditor";
import { Header } from "../Header/Header";

export const Definition = (): ReactElement => {
  const { t } = useTranslation("definition");

  const { data } = useMatch<LocationGenerics>();

  const [definitionStore] = useState(() => {
    return DefinitionStore.create({
      projectDefinition: {
        name: t("defaultDefinitionName"),
        ...data.projectDefinition,
      },
    });
  });

  return (
    <Page>
      <Page.Header>
        <Header />
      </Page.Header>
      <Page.Content>
        <DefinitionEditor definitionStore={definitionStore} />
      </Page.Content>
    </Page>
  );
};
