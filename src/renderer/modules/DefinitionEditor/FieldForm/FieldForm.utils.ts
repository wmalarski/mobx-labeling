import { DefinitionKind } from "renderer/models/definition";

const kinds: Record<DefinitionKind, undefined> = {
  Box3d: undefined,
  CheckBox: undefined,
  ComboBox: undefined,
  Eye: undefined,
  Graph: undefined,
  Line: undefined,
  MultiSelect: undefined,
  Number: undefined,
  Point: undefined,
  Polygon: undefined,
  Rectangle: undefined,
  Select: undefined,
  Text: undefined,
};

export const definitionKinds: DefinitionKind[] = Object.keys(kinds).map(
  (key) => key as DefinitionKind
);
