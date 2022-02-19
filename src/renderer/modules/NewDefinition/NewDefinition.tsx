import { observer } from "mobx-react-lite";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-location";
import { IntroLayout } from "renderer/components";
import { DefinitionStore } from "renderer/models";
import { routePaths } from "renderer/utils/routes";
import { DefinitionEditor } from "../DefinitionEditor/DefinitionEditor";

export const NewDefinition = observer((): ReactElement => {
  const { t } = useTranslation("definition");

  const [definitionStore] = useState(() => {
    return DefinitionStore.create({
      state: "done",
      projectDefinition: {
        name: t("defaultDefinitionName"),
      },
    });
  });

  return (
    <IntroLayout>
      <Link to={routePaths.definitions}>{t("definitionsList")}</Link>
      <DefinitionEditor definitionStore={definitionStore} />
    </IntroLayout>
  );
});
