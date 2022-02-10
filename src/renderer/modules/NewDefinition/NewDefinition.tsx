import { Text } from "@nextui-org/react";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-location";
import { IntroLayout } from "renderer/components/IntroLayout/IntroLayout";
import { ProjectDefinition } from "renderer/models/definition";
import { routePaths } from "renderer/utils/routes";
import { DefinitionForm } from "./DefinitionForm/DefinitionForm";
import { ObjectForm } from "./ObjectForm/ObjectForm";
import { ObjectsList } from "./ObjectsList/ObjectsList";

export const NewDefinition = (): ReactElement => {
  const { t } = useTranslation("definition");

  const [definition] = useState(() => {
    return ProjectDefinition.create({
      name: t("defaultDefinitionName"),
    });
  });

  const objectDefinition = definition.objects.at(0);

  return (
    <IntroLayout>
      <Text h1>{t("newDefinitionHeader")}</Text>
      <Link to={routePaths.definitions}>Definitions</Link>
      <Link to={routePaths.workspace} search={{ project: "project123" }}>
        Workspace
      </Link>
      <DefinitionForm definition={definition} />
      <ObjectsList definition={definition} />
      {objectDefinition && <ObjectForm objectDefinition={objectDefinition} />}
    </IntroLayout>
  );
};
