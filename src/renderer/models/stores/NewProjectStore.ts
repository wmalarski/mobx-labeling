import { Instance, types } from "mobx-state-tree";
import { Resource } from "../project/Resource";
import { DefinitionsList } from "./DefinitionsList";

const defaultFps = 18;
const defaultFrameShift = 0;
const defaultBatchSize = 500;

export const NewProjectStore = types
  .model("NewProjectStore", {
    name: types.string,
    projectPath: types.optional(types.string, ""),
    definitionId: types.maybe(types.string),
    definitions: DefinitionsList,
    resources: types.array(Resource),
    batchSize: types.optional(types.number, defaultBatchSize),
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
    setBatchSize(batchSize: number) {
      self.batchSize = batchSize;
    },
    addResource(path: string) {
      self.resources.push({
        fps: defaultFps,
        frameShift: defaultFrameShift,
        path,
      });
    },
    removeResource(resource: Instance<typeof Resource>) {
      self.resources.remove(resource);
    },
  }));
