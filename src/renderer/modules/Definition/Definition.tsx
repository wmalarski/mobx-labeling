import { ReactElement } from "react";
import { Link, useMatch } from "react-location";
import { IntroLayout } from "renderer/components/IntroLayout/IntroLayout";
import { LocationGenerics, routePaths } from "renderer/utils/routes";

export const Definition = (): ReactElement => {
  const { params } = useMatch<LocationGenerics>();
  console.log(params);

  return (
    <IntroLayout>
      <p>Definition</p>
      <p>{params.definitionId}</p>
      <Link to={routePaths.definitions}>definitions</Link>
    </IntroLayout>
  );
};
