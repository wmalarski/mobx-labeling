import { DefaultGenerics, Route } from "react-location";
import { Definition } from "./Definition";

export const definitionRoute: Route<DefaultGenerics> = {
  path: ":definitionId",
  element: <Definition />,
};
