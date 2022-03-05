import { Spacer } from "@geist-ui/core";
import { observer } from "mobx-react-lite";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { IntroLayout } from "renderer/components";
import { DefinitionStore } from "renderer/models";
import { DefinitionEditor } from "../DefinitionEditor/DefinitionEditor";
import { Header } from "../Header/Header";

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
    <IntroLayout>
      <Header />
      <Spacer h={1} />
      <DefinitionEditor definitionStore={definitionStore} />
    </IntroLayout>
  );
});
