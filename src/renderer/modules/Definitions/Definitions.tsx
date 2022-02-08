import { ReactElement } from "react";
import { Link } from "react-location";
import { IntroLayout } from "renderer/components/IntroLayout/IntroLayout";
import { routePaths } from "renderer/utils/routes";

export const Definitions = (): ReactElement => {
  return (
    <IntroLayout>
      <p>Definitions</p>
      <Link to={routePaths.definition("First")}>First</Link>
      <Link to={routePaths.home}>Home</Link>
      <Link to={routePaths.newProject}>New Project</Link>
    </IntroLayout>
  );
};
