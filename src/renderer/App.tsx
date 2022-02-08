import { NextUIProvider } from "@nextui-org/react";
import { Outlet, Router, useRouter } from "react-location";
import { location, routes } from "./utils/routes";

const Debug = () => {
  const router = useRouter();
  console.log(router);
  return <pre>{JSON.stringify(router.state.location, null, 2)}</pre>;
};

export default function App() {
  return (
    <NextUIProvider>
      <Router location={location} routes={routes}>
        <Debug />
        <Outlet />
      </Router>
    </NextUIProvider>
  );
}
