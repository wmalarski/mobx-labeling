import { Instance, SnapshotIn } from "mobx-state-tree";
import {
  definitionKinds,
  FieldDefinition,
  ItemDefinition,
  ProjectDefinition,
} from "renderer/models";

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
