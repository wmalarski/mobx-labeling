import { Spacer } from "@nextui-org/react";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMatch } from "react-location";
import { IntroLayout } from "renderer/components";
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
    <IntroLayout>
      <Header />
      <Spacer y={1} />
      <DefinitionEditor definitionStore={definitionStore} />
    </IntroLayout>
  );
};
