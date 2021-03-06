import * as FlexLayout from "flexlayout-react";
import { getSnapshot, Instance, SnapshotIn } from "mobx-state-tree";
import { nanoid } from "nanoid";
import {
  DefinitionEntry,
  definitionKinds,
  DefinitionStore,
  FieldDefinition,
  ItemDefinition,
  NewProjectStore,
  ProjectDefinition,
  ProjectEntry,
  ProjectRoot,
  ProjectsList,
  Resource,
  WorkspaceStore,
} from "renderer/models";
import {
  ElectronServices,
  IpcDefinitionsService,
  IpcProjectService,
  IpcResourcesService,
} from "renderer/services";

export const mockFieldDefinition = ({
  index,
  update,
}: {
  index?: number;
  update?: Partial<SnapshotIn<typeof FieldDefinition>>;
} = {}): Instance<typeof FieldDefinition> => {
  const random = Math.floor(Math.random() * definitionKinds.length);
  const kind = definitionKinds[random];
  return FieldDefinition.create({
    name: `Field${index} ${kind}`,
    description: "Description",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kind: kind as any,
    ...update,
  });
};

export const mockItemDefinition = ({
  index,
  fieldsCount = 4,
  update,
}: {
  index?: number;
  fieldsCount?: number;
  update?: Partial<SnapshotIn<typeof ItemDefinition>>;
} = {}): Instance<typeof ItemDefinition> => {
  return ItemDefinition.create({
    name: `Item${index}`,
    fields: Array(fieldsCount)
      .fill(0)
      .map((_, index) => mockFieldDefinition({ index })),
    ...update,
  });
};

export const mockProjectDefinition = ({
  itemsCount = 4,
  update,
}: {
  itemsCount?: number;
  update?: Partial<SnapshotIn<typeof ProjectDefinition>>;
} = {}): Instance<typeof ProjectDefinition> => {
  return ProjectDefinition.create({
    name: "Project",
    items: Array(itemsCount)
      .fill(0)
      .map((_, index) => mockItemDefinition({ index })),
    ...update,
  });
};

export const mockDefinitionEntry = ({
  index = 0,
  update,
}: {
  index?: number;
  update?: Partial<SnapshotIn<typeof DefinitionEntry>>;
} = {}): Instance<typeof DefinitionEntry> => {
  const id = nanoid();
  return DefinitionEntry.create({
    id,
    name: `Project${index}`,
    description: "",
    updatedAt: new Date(1999, 9, 9 + index).getTime(),
    ...update,
  });
};

export const mockDefinitionEntries = ({
  entriesCount = 4,
}: {
  entriesCount?: number;
} = {}): Instance<typeof DefinitionEntry>[] => {
  return Array(entriesCount)
    .fill(0)
    .map((_, index) => mockDefinitionEntry({ index }));
};

export const mockDefinitionStore = (
  args: {
    itemsCount?: number;
    update?: Partial<SnapshotIn<typeof ProjectDefinition>>;
  } = {}
) => {
  return DefinitionStore.create({
    projectDefinition: mockProjectDefinition(args),
  });
};

export const mockResource = ({
  update,
}: {
  update?: Partial<SnapshotIn<typeof Resource>>;
} = {}) => {
  return Resource.create({
    fps: 24,
    frameShift: 0,
    path: "https://www.w3schools.com/html/mov_bbb.mp4",
    ...update,
  });
};

export const mockNewProjectStore = ({
  update,
}: {
  update?: Partial<SnapshotIn<typeof NewProjectStore>>;
} = {}) => {
  return NewProjectStore.create({
    definitions: {},
    name: "Project name",
    ...update,
  });
};

export const mockProjectRoot = ({
  update,
}: {
  update?: Partial<ProjectRoot>;
} = {}): ProjectRoot => {
  return {
    batchSize: 100,
    batches: [],
    definition: {
      createdAt: 0,
      description: "",
      id: "1",
      items: [],
      name: "name",
      updatedAt: 0,
    },
    id: "1",
    items: [],
    name: "name",
    projectPath: "path",
    resources: [],
    updatedAt: 0,
    ...update,
  };
};

export const mockProjectEntry = ({
  index,
  update,
}: {
  index?: number;
  update?: Partial<SnapshotIn<typeof ProjectEntry>>;
} = {}): Instance<typeof ProjectEntry> => {
  return ProjectEntry.create({
    definition: `Definition${index}`,
    id: `${index ?? nanoid()}`,
    name: `Name${index}`,
    projectPath: `Path${index}`,
    updatedAt: 0,
    ...update,
  });
};

export const mockProjectEntries = ({
  entriesCount = 15,
}: {
  entriesCount?: number;
} = {}): Instance<typeof ProjectEntry>[] => {
  return Array(entriesCount)
    .fill(0)
    .map((_, index) => mockProjectEntry({ index }));
};

export const mockProjectsList = ({
  update,
}: {
  update?: Partial<SnapshotIn<typeof ProjectsList>>;
} = {}): Instance<typeof ProjectsList> => {
  return ProjectsList.create({
    ...update,
  });
};

export const mockWorkspaceStore = ({
  update,
  items = 0,
  fillFrames = 100,
}: {
  update?: Partial<SnapshotIn<typeof WorkspaceStore>>;
  items?: number;
  fillFrames?: number;
} = {}) => {
  const workspaceStore = WorkspaceStore.create({
    project: {
      batchSize: 100,
      definition: mockProjectDefinition(),
      id: "id",
      name: "Name",
      projectPath: "projectPath",
      updatedAt: 0,
      batches: [],
      resources: [mockResource()],
    },
    ...update,
  });

  Array(items)
    .fill(0)
    .forEach(() => {
      const length = workspaceStore.project.definition.items.length;
      const index = Math.floor(Math.random() * length);
      const definition = workspaceStore.project.definition.items[index];
      workspaceStore.addItem(definition);
      const item = workspaceStore.batch.items.at(-1);

      Array(fillFrames)
        .fill(0)
        .forEach(() => {
          const frame = Math.floor(Math.random() * workspaceStore.framesCount);
          item?.currentFrame.setFrame(frame);
          item?.addCurrentFrame();
        });
    });

  return workspaceStore;
};

export const mockItem = ({
  update,
  fillFrames,
}: {
  update?: Partial<SnapshotIn<typeof WorkspaceStore>>;
  fillFrames?: number;
} = {}) => {
  const workspaceStore = mockWorkspaceStore({
    items: 1,
    fillFrames,
    update,
  });
  return workspaceStore.batch.items[0];
};

export const mockLayoutNode = (): FlexLayout.TabNode => {
  return {
    getRect() {
      return { width: 500, height: 500 };
    },
    getConfig() {
      return getSnapshot(mockResource());
    },
    setEventListener() {
      void 0;
    },
    removeEventListener() {
      void 0;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
};

export const mockIpcDefinitionsService = ({
  update,
  updateEntries,
  entriesCount = 45,
}: {
  update?: Partial<IpcDefinitionsService>;
  updateEntries?: Instance<typeof DefinitionEntry>[];
  entriesCount?: number;
} = {}): IpcDefinitionsService => {
  const projectDefinition = getSnapshot(mockProjectDefinition());
  const entries = (
    updateEntries ?? mockDefinitionEntries({ entriesCount })
  ).map((entry) => getSnapshot(entry));

  return {
    readDefinition: () => Promise.resolve(projectDefinition),
    readDefinitions: ({ limit, start, query }) => {
      const lower = query?.toLowerCase();

      const queried = !lower
        ? entries
        : entries.filter(({ name }) => name.toLowerCase().includes(lower));

      const data = queried.slice(start, start + limit);

      return Promise.resolve({ data, totalSize: queried.length });
    },
    removeDefinition: () => Promise.resolve(),
    saveDefinition: () => Promise.resolve(),
    ...update,
  };
};

export const mockIpcResourcesService = ({
  update,
}: {
  update?: Partial<IpcResourcesService>;
} = {}): IpcResourcesService => {
  return {
    addOnOpenListener: () => void 0,
    addOnSaveListener: () => void 0,
    openDialog: () => void 0,
    removeOnOpenListener: () => void 0,
    removeOnSaveListener: () => void 0,
    saveDialog: () => void 0,
    ...update,
  };
};

export const mockIpcProjectService = ({
  update,
}: {
  update?: Partial<IpcProjectService>;
} = {}): IpcProjectService => {
  return {
    createProject: () => Promise.resolve(),
    readBatch: () => Promise.resolve({ id: "1" }),
    readProject: () => Promise.resolve(mockProjectRoot()),
    readProjects: () =>
      Promise.resolve({
        data: mockProjectEntries({
          entriesCount: 20,
        }),
        totalSize: 20,
      }),
    updateBatch: () => Promise.resolve(),
    ...update,
  };
};

export const mockElectronServices = (
  update: Partial<ElectronServices> = {}
): ElectronServices => {
  return {
    ipcResources: mockIpcResourcesService(),
    ipcDefinitions: mockIpcDefinitionsService(),
    ipcProject: mockIpcProjectService(),
    ...update,
  };
};
