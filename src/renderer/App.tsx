import { NextUIProvider } from "@nextui-org/react";
import { ReactElement } from "react";
import { Outlet, Router } from "react-location";
import { Page } from "./components/Page/Page";
import { darkTheme } from "./styles/config";
import { location, routes } from "./utils/routes";

export const App = (): ReactElement => {
  return (
    <NextUIProvider theme={darkTheme}>
      <Router location={location} routes={routes}>
        <Page>
          <Outlet />
        </Page>
      </Router>
    </NextUIProvider>
  );
};
