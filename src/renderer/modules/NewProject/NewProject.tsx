import { Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { getSnapshot } from "mobx-state-tree";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMatch } from "react-location";
import { IntroLayout, StyledLink } from "renderer/components";
import { DefinitionsList, NewProjectStore } from "renderer/models";
import { LocationGenerics, routePaths } from "renderer/utils/routes";
import { Header } from "../Header/Header";

export const NewProject = observer((): ReactElement => {
  const { t } = useTranslation("definition");

  const { data } = useMatch<LocationGenerics>();

  const [newProjectStore] = useState(() => {
    return NewProjectStore.create({
      name: "",
      definitionId: data.projectDefinition?.id,
      resources: [],
      definitions: DefinitionsList.create({
        query: data.projectDefinition?.name,
      }),
    });
  });

  return (
    <IntroLayout>
      <Header />
      <Spacer y={1} />
      <pre>{JSON.stringify(getSnapshot(newProjectStore), null, 2)}</pre>
      <StyledLink to={routePaths.definitions}>
        {t("definitionsHeader")}
      </StyledLink>
      <StyledLink to={routePaths.workspace} search={{ project: "project123" }}>
        Workspace
      </StyledLink>
    </IntroLayout>
  );
});
