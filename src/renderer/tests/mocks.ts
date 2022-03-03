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
} from "renderer/models";
import { IpcDefinitionsService, IpcResourcesService } from "renderer/services";

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
