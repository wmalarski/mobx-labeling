import { Page } from "@geist-ui/core";
import { ReactElement } from "react";
import { useMatch } from "react-location";
import { StyledLink } from "renderer/components";
import { LocationGenerics, routePaths } from "renderer/utils/routes";

export const Workspace = (): ReactElement => {
  const { data, search } = useMatch<LocationGenerics>();

  return (
    <Page>
      <Page.Content>
        <p>Workspace</p>
        <pre>{JSON.stringify({ search, data }, null, 2)}</pre>
        <StyledLink to={routePaths.home}>Home</StyledLink>
      </Page.Content>
    </Page>
  );
};
