import { ReactElement } from "react";
import { Link } from "react-location";
import { routePaths } from "renderer/utils/routes";

export const NewProject = (): ReactElement => {
  return (
    <div>
      <p>NewProject</p>
      <Link to={routePaths.definitions}>Definitions</Link>
      <Link to={routePaths.workspace} search={{ project: "project123" }}>
        Workspace
      </Link>
    </div>
  );
};
