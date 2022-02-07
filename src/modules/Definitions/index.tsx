import { DefaultGenerics, Route } from "react-location";
import { definitionRoute } from "../Definition";
import { Definitions } from "./Definitions";
import { DefinitionsList } from "./DefinitionsList/DefinitionsList";

export const definitionsRoute: Route<DefaultGenerics> = {
  path: "/definitions",
  element: <Definitions />,
  children: [{ path: "/", element: <DefinitionsList /> }, definitionRoute],
};
