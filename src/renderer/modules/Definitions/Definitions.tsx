import { ReactElement } from "react";
import { Link } from "react-location";
import { routePaths } from "renderer/utils/routes";

export const Definitions = (): ReactElement => {
  return (
    <div>
      <p>Definitions</p>
      <Link to={routePaths.definition("First")}>First</Link>
      <Link to={routePaths.home}>Home</Link>
      <Link to={routePaths.newProject}>New Project</Link>
    </div>
  );
};
