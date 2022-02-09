import { ReactElement } from "react";
import { Link } from "react-location";
import { IntroLayout } from "renderer/components/IntroLayout/IntroLayout";
import { routePaths } from "renderer/utils/routes";

export const NewDefinition = (): ReactElement => {
  return (
    <IntroLayout>
      <p>NewDefinition</p>
      <Link to={routePaths.definitions}>Definitions</Link>
      <Link to={routePaths.workspace} search={{ project: "project123" }}>
        Workspace
      </Link>
    </IntroLayout>
  );
};
