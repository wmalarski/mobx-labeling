import { DefaultGenerics, Route } from "react-location";
import { Login } from "./Login";

export const loginRoute: Route<DefaultGenerics> = {
  path: "/login",
  element: <Login />,
};
