import { CssBaseline, GeistProvider } from "@geist-ui/core";
import { ReactElement, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { Outlet, Router } from "react-location";
import { Page } from "./components";
import i18next from "./utils/i18next";
import { location, routes } from "./utils/routes";

export const App = (): ReactElement => {
  const [routerRoutes] = useState(routes);

  return (
    <GeistProvider themeType="dark">
      <CssBaseline />
      <I18nextProvider i18n={i18next}>
        <Router location={location} routes={routerRoutes}>
          <Page>
            <Outlet />
          </Page>
        </Router>
      </I18nextProvider>
    </GeistProvider>
  );
};
