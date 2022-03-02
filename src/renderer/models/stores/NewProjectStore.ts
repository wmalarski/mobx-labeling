import { types } from "mobx-state-tree";
import { Resource } from "../project/Resource";
import { DefinitionsList } from "./DefinitionsList";

const defaultFps = 18;

export const NewProjectStore = types
  .model("NewProjectStore", {
    name: types.string,
    projectPath: types.maybe(types.string),
    definitionId: types.maybe(types.string),
    definitions: DefinitionsList,
    resources: types.array(Resource),
    batchSize: types.optional(types.number, 500),
  })
  .actions((self) => ({
    setDefinitionId(definitionId: string) {
      self.definitionId = definitionId;
    },
    setName(name: string) {
      self.name = name;
    },
    setProjectPath(path: string) {
      self.projectPath = path;
    },
    addResource(path: string) {
      self.resources.push({
        fps: defaultFps,
        path,
      });
    },
    setBatchSize(batchSize: number) {
      self.batchSize = batchSize;
    },
  }));
