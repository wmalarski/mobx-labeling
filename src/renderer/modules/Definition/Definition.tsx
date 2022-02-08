import { ReactElement } from "react";
import { Link, useMatch } from "react-location";
import { LocationGenerics, routePaths } from "renderer/utils/routes";

export const Definition = (): ReactElement => {
  const { params } = useMatch<LocationGenerics>();
  console.log(params);

  return (
    <div>
      <p>Definition</p>
      <p>{params.definitionId}</p>
      <Link to={routePaths.definitions}>definitions</Link>
    </div>
  );
};
