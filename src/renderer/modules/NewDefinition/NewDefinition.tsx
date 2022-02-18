import { observer } from "mobx-react-lite";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-location";
import { IntroLayout } from "renderer/components";
import { ProjectDefinition } from "renderer/models";
import { routePaths } from "renderer/utils/routes";
import { DefinitionEditor } from "../DefinitionEditor/DefinitionEditor";

export const NewDefinition = observer((): ReactElement => {
  const { t } = useTranslation("definition");

  const [projectDefinition] = useState(() => {
    return ProjectDefinition.create({
      name: t("defaultDefinitionName"),
    });
  });

  return (
    <IntroLayout>
      <Link to={routePaths.definitions}>{t("definitionsList")}</Link>
      <DefinitionEditor projectDefinition={projectDefinition} />
    </IntroLayout>
  );
});
