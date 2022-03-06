import { Page } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { DefinitionStore } from "renderer/models";
import { DefinitionEditor } from "../../fragments/DefinitionEditor/DefinitionEditor";
import { Header } from "../../fragments/Header/Header";

export const NewDefinition = observer((): ReactElement => {
  const { t } = useTranslation("definition");

  const [definitionStore] = useState(() => {
    return DefinitionStore.create({
      projectDefinition: {
        name: t("defaultDefinitionName"),
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
});
