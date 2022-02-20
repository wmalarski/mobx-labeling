import { types } from "mobx-state-tree";
import { Resource } from "../project/Resource";
import { DefinitionsList } from "./DefinitionsList";

const defaultFps = 18;

export const NewProjectStore = types
  .model("NewProjectStore", {
    name: types.string,
    definitionId: types.maybe(types.string),
    definitions: DefinitionsList,
    resources: types.array(Resource),
  })
  .actions((self) => ({
    setDefinitionId(definitionId: string) {
      self.definitionId = definitionId;
    },
    addResource(path: string) {
      self.resources.push({
        fps: defaultFps,
        path,
      });
    },
  }));
