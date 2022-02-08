import { ReactElement } from "react";
import { Link, useSearch } from "react-location";
import { LocationGenerics, routePaths } from "renderer/utils/routes";

export const Workspace = (): ReactElement => {
  const search = useSearch<LocationGenerics>();

  return (
    <div>
      <p>Workspace</p>
      <pre>{JSON.stringify(search, null, 2)}</pre>
      <Link to={routePaths.home}>Home</Link>
    </div>
  );
};
