import { observer } from "mobx-react-lite";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-location";
import { IntroLayout } from "renderer/components";
import { DefinitionsList } from "renderer/models";
import { routePaths } from "renderer/utils/routes";
import { DefinitionsItem } from "./DefinitionsItem/DefinitionsItem";

export const Definitions = observer((): ReactElement => {
  const { t } = useTranslation("definition");

  const [definitionsList] = useState(() => {
    return DefinitionsList.create({});
  });

  return (
    <IntroLayout>
      <p>{t("definitionsHeader")}</p>
      <Link to={routePaths.definition("First")}>First</Link>
      <Link to={routePaths.home}>Home</Link>
      <Link to={routePaths.newDefinition}>{t("navNewDefinition")}</Link>
      <Link to={routePaths.newProject}>New Project</Link>
      {definitionsList.definitions.map((definitionEntry) => (
        <DefinitionsItem
          key={definitionEntry.id}
          definitionEntry={definitionEntry}
        />
      ))}
    </IntroLayout>
  );
});
