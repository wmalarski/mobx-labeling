import { NextUIProvider } from "@nextui-org/react";
import { ReactElement } from "react";
import { I18nextProvider } from "react-i18next";
import { Outlet, Router } from "react-location";
import { Page } from "./components/Page/Page";
import { darkTheme } from "./styles/config";
import i18next from "./utils/i18next";
import { location, routes } from "./utils/routes";

export const App = (): ReactElement => {
  return (
    <NextUIProvider theme={darkTheme}>
      <I18nextProvider i18n={i18next}>
        <Router location={location} routes={routes}>
          <Page>
            <Outlet />
          </Page>
        </Router>
      </I18nextProvider>
    </NextUIProvider>
  );
};
