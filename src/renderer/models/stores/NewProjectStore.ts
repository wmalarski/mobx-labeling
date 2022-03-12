import { flow, getSnapshot, Instance, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { DefinitionsList } from "../definitions/DefinitionsList";
import { Resource } from "../project/Resource";

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
    createProject: flow(function* (onSuccess: () => void) {
      if (!self.definitionId) return;

      const definition = yield window.electron.ipcDefinitions.readDefinition(
        self.definitionId
      );

      yield window.electron.ipcProject.createProject({
        batchSize: self.batchSize,
        batches: [],
        definition,
        id: nanoid(),
        items: [],
        name: self.name,
        projectPath: self.projectPath,
        resources: getSnapshot(self.resources),
        updatedAt: new Date().getTime(),
      });

      onSuccess();
    }),
  }));
